import express from 'express';
import axios from 'axios';
import debug from 'debug';
import { getDBConnection } from './db.js';
// import dbPool from './db.js';

const debugLog = new debug('log');
const debugError = new debug('error');
const debugDb = new debug('db');

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 세션 정보를 읽어와서 회원만 즐겨찾는 환율 세트 저장 가능하게 해야 함
// 로그인 기능 제작 전이라서 일단 임의 사용자 사용

async function getAvailableCurrencies() {
  try {
    // conn = await dbPool.getConnection();
    conn = await getDBConnection();
    const rows = await conn.query(`
    SELECT currency_code AS currencyCode, currency
    FROM available_currencies
    ORDER BY rank;
  `);
    debugDb('(getAvailableCurrencies 함수 안) rows:', rows);
    // 통화 코드, 통화명, 국기 아이콘 URL
    const availableCurrencies = rows.map((row) => {
      row.flagURL = `https://flagcdn.com/w40/${(row.currencyCode).slice(0, 2).toLowerCase()}.png`;
      return row;
    });
    if (!availableCurrencies || availableCurrencies.length === 0) {
      res.status(404).json({ message: '통화 목록이 없습니다.' });
    }
    debugLog('(getAvailableCurrencies 함수 안) availableCurrencies:', availableCurrencies);
    return availableCurrencies;
  } catch (error) {
    console.error('통화 목록 조회 중 오류:', error.message);
    res.status(500).json({ message: '통화 목록을 가져올 수 없습니다.' });
  } finally {
    if (conn) {
      // await conn.release(); // 커넥션 풀에 반환
      await conn.close(); // 커넥션 연결 닫기
    }
  }
}
const availableCurrencies = await getAvailableCurrencies();

// 통화 목록
router.get('/currencies', async (req, res) => {
  if (availableCurrencies) {
    debugLog(availableCurrencies);
    return res.status(200).json(availableCurrencies);
  } else {
    const availableCurrencies = await getAvailableCurrencies();
    res.status(200).json(availableCurrencies);
  }
});

// 환전 계산
router.get('/convert', async (req, res) => {
  const { from, amount, to } = req.query;
  try {
    // 환율 계산 (외부) API 호출
    const fxInfo = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.CURRENT_API_KEY}/pair/${from}/${to}`);
    const tempAmount = amount * fxInfo.data.conversion_rate; // (환전하고 싶은) 기준 통화 금액 x 환율
    const convertedAmount = (to === 'KRW') ? Math.round(tempAmount) : tempAmount;
    if (convertedAmount) {
      res.status(200).json({ to, convertedAmount }); // 목표 통화, 환전된 금액
    } else {
      res.status(404).json({ message: `환전 정보가 존재하지 않습니다.` });
    }
  } catch (error) {
    if (error.response) { // HTTP 응답에서 오류 발생
      debugError(error.response.data);
      debugError(error.response.status);
      debugError(error.response.headers);
    } else if (error.request) { // HTTP 요청에서 오류 발생
      debugError(error.request);
    } else { // HTTP 요청하는 중에 오류 발생
      debugError('Error', error.message);
    }
    debugError(error.config);
    res.status(500).send();
  }
});

// 즐겨찾는 환율 세트 저장
router.put('/users/:userId/user-currency-pair', async (req, res) => {
  const { userId } = req.params;
  debugLog(userId);
  const newCurrencyPairs = req.body;
  debugLog(newCurrencyPairs);
  try {
    const currencyMapper = {};
    // conn = await dbPool.getConnection();
    conn = await getDBConnection();
    debugDb('커넥션 얻어오기 성공');

    // 아래 쿼리는 [ { currency_code: 'USD', currency_id: 1 }, ~ 후략 ~ ] 형태의 객체 '배열'을 반환
    const rows = await conn.query(`
        SELECT currency_code, currency_id
        FROM available_currencies
        ORDER BY rank;
      `);
    debugDb('통화 객체 배열 반환 성공');

    // 1. { USD: 1, EUR: 2, ~ 후략 ~ } 형태의 매핑 객체 리터럴 생성
    rows.map((row) => currencyMapper[row.currency_code] = row.currency_id);
    debugDb('매핑 객체 리터럴 생성 성공');

    // 2. 위 매핑 객체 리터럴을 이용하여, source, target 통화 코드 (from, to)를
    //    DB 테이블 컬럼에 맞는 currency_id로 변환
    //    예. [[1, 'USD', 'KRW', 1], [1, 'EUR', 'KRW', 2, 1550, 'GT']] --→
    //        [[1, 1, 12, 1], [1, 2, 12, 2, 1550, 'GT']]
    const convertedCurrencyPairs = newCurrencyPairs.map((row) => {
      const tmpArray = row.map((col, index) => {
        return ((index === 1 || index === 2) ? currencyMapper[col] : col);
      });
      for (let i = tmpArray.length; i < 6; i++) {
        tmpArray.push(null); // insert 문에 인수로 주기 위해서 빈 값에는 null 추가
      }
      return tmpArray;
    });
    debugDb('매핑 작업 완료 (예. USD → 1)');

    const deleteQuery = 'DELETE FROM user_currency_pair where user_id = ?';
    const insertQuery = `
      INSERT INTO user_currency_pair (user_id, source_id, target_id, sort_order, amount, alert_condition)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    await conn.beginTransaction(); // 새 트랜잭션 시작
    debugDb('Transaction 시작');
    // 회원이 예전에 저장해놓은 환율 세트 전부 삭제
    const deleteResult = await conn.query(deleteQuery, [userId]);
    debugDb('즐겨찾는 환율 세트 삭제 완료');
    // 회원이 새로 저장한 환율 세트 일괄 추가
    const insertResult = await conn.batch(insertQuery, convertedCurrencyPairs);
    debugDb('즐겨찾는 환율 세트 일괄 입력 완료');
    debugDb('insertResult:', insertResult);
    await conn.commit(); // delete → batch insert 작업 전부 정상 처리되었으면 트랜잭션 커밋
    debugDb('Transaction Committed!');

    if (insertResult.affectedRows === newCurrencyPairs.length) {
      res.status(201).json({
        message: '즐겨찾는 환율 세트 저장이 완료되었습니다.',
      });
    } else {
      res.status(400).json({
        message: '즐겨찾는 환율 세트가 제대로 저장되지 않았습니다. 관리자에게 문의하세요.',
      });
    }
  } catch (error) {
    conn.rollback(); // 오류가 발생했으면, 위 트랜잭션 롤백
    debugDb('오류 발생해서 롤백!');
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
        message: '이미 저장하신 환율 세트입니다.',
      });
    } else if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  } finally {
    if (conn) {
      // await conn.release();
      await conn.close();
    }
  }
});

// 즐겨찾는 환율 세트 조회 (세션 제대로 작동하는 거 확인되면 라우터 변경 예정)
router.get('/users/:userId/user-currency-pair', async (req, res) => {
  // router.get('/user-currency-pair ', (req, res) => {
  const { userId } = req.params;
  try {
    // conn = await dbPool.getConnection();
    conn = await getDBConnection();
    // 기준/목표 통화 코드, 정렬 순서, 알림 메일 발송을 위한 설정 금액과 조건(LT(<=) or GT(>=))
    const userCurrencyPairs = await conn.query(`
      SELECT
        s.currency_code AS source_currency_code,
        t.currency_code AS target_currency_code,
        u.sort_order,
        u.amount,
        u.alert_condition
      FROM user_currency_pair u
      JOIN available_currencies s ON u.source_id = s.currency_id
      JOIN available_currencies t ON u.target_id = t.currency_id
      WHERE u.user_id = ?
      ORDER BY sort_order;
    `, [userId]);
    if (userCurrencyPairs.length > 0) {
      res.status(200).json({
        message: '즐겨찾는 환율 세트 조회가 완료되었습니다.',
        userCurrencyPairs
      });
    } else {
      res.status(404).json({
        message: '즐겨찾는 환율 세트가 저장된 게 없습니다.',
      });
    }
    // } else {
    //   res.status(404).json({ message: '회원 정보가 존재하지 않습니다.' });
    // }
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  } finally {
    if (conn) {
      // await conn.release();
      await conn.close();
    }
  }
});

// 환율 히스토리
router.get('/history', async (req, res) => {
  const { source, target } = req.query;
  debugLog('req.query:', req.query);
  try {
    // conn = await dbPool.getConnection();
    conn = await getDBConnection();
    const fxHistory = await conn.query(`
        SELECT
          s.currency_code AS source_currency_code,
          t.currency_code AS target_currency_code,
          h.fx_rate,
          DATE_FORMAT(h.date, "%X-%m-%d") AS date
        FROM fx_rate_history h
        JOIN available_currencies s ON h.source_id = s.currency_id
        JOIN available_currencies t ON h.target_id = t.currency_id
        WHERE s.currency_code = ?
        AND t.currency_code = ?
        ORDER BY h.date ASC;
        `, [source, target]);
    // 날짜 범위 지정? 1년치도 휴일 제외하면 250일 정도로 많지 않으니 일단 전부 전송
    // h.date BETWEEN ?
    debugLog('fxHistory:', fxHistory);
    if (fxHistory.length > 0) {
      res.status(200).json({
        message: '환율 히스토리 조회가 완료되었습니다.',
        fxHistory
      });
    } else {
      res.status(404).json({
        message: '환율 히스토리가 저장된 게 없습니다.',
      });
    }
    // } else {
    //   res.status(404).json({ message: '환율 정보가 존재하지 않습니다.' });
    // }
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  } finally {
    if (conn) {
      // await conn.release();
      await conn.close();
    }
  }
});

export default router;
