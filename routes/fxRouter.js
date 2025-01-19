import express from 'express';
import axios from 'axios';
import debug from 'debug';
import dbPool from './db.js';

const debugLog = new debug('log');
const debugError = new debug('error');
const debugDb = new debug('db');

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 세션 정보를 읽어와서 회원만 즐겨찾는 환율 쌍 저장 가능하게 해야 함
// 로그인 기능 제작 전이라서 일단 임의 사용자 사용

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
    // console.log(error);
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // `error.request` is an instance of XMLHttpRequest in the browser and one of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    res.status(500).send();
  }
});

// 즐겨찾는 환율 쌍 저장
router.post('/users/:userId/user-currency-pair', async (req, res) => {
  const { userId } = req.params;
  const newCurrencyPairs = req.body;
  try {
    const currencyMapper = {};
    conn = await dbPool.getConnection();

    // 아래 쿼리는 [ { currency_code: 'USD', currency_id: 1 }, ~ 후략 ~ ] 형태의 객체 '배열'을 반환
    const rows = await conn.query(`
        SELECT currency_code, currency_id
        FROM available_currencies
        ORDER BY rank;
      `);

    // 1. { USD: 1, EUR: 2, ~ 후략 ~ } 형태의 매핑 객체 리터럴 생성
    rows.map((row) => currencyMapper[row.currency_code] = row.currency_id);

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

    const insertQuery = `
      INSERT INTO user_currency_pair (user_id, source_id, target_id, sort_order, amount, alert_condition)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await conn.beginTransaction(); // 새 트랜잭션 시작
    const result = await conn.batch(insertQuery, convertedCurrencyPairs);
    await conn.commit(); // batch insert 작업 전부 정상 처리되었으면 트랜잭션 커밋

    if (result.affectedRows === newCurrencyPairs.length) {
      res.status(201).json({
        message: '즐겨찾는 환율 쌍 저장이 완료되었습니다.',
      });
    } else {
      res.status(400).json({
        message: '즐겨찾는 환율 쌍 저장이 제대로 완료되지 않았습니다. 관리자에게 문의하세요.',
      });
    }
  } catch (error) {
    conn.rollback(); // 오류가 발생했으면, 위 트랜잭션 롤백
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
        message: '이미 저장하신 환율 쌍입니다.',
      });
    } else if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    } else {
      res.status(500).json({ message: 'Unknown Error' });
    }
  } finally {
    if (conn) {
      await conn.release(); // 커넥션 풀에 반환
    }
  }
});

// 즐겨찾는 환율 쌍 조회 (세션 제대로 작동하는 거 확인되면 라우터 변경 예정)
router.get('/users/:userId/user-currency-pair', async (req, res) => {
  // router.get('/user-currency-pair ', (req, res) => {
  const { userId } = req.params;
  try {
    conn = await dbPool.getConnection();
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
    debugLog('userCurrencyPairs:', userCurrencyPairs);
    if (userCurrencyPairs.length > 0) {
      res.status(200).json({
        message: '즐겨찾는 환율 쌍 조회가 완료되었습니다.',
        userCurrencyPairs
      });
    } else {
      res.status(404).json({
        message: '즐겨찾는 환율 쌍이 저장된 게 없습니다.',
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
      await conn.release();
    }
  }
});

// 환율 히스토리
router.get('/history', async (req, res) => {
  const { from, to } = req.query;
  try {
    // 히스토리 API는 제공하는 곳이 없음
    // 일정 기간의 환율 정보를 저장할 DB 스키마 구성 → 테이블 생성 →
    // Web에서 KRW 과거 환율을 엑셀 등으로 받아서 DB에 직접 입력
    // /history 엔드포인트에서는 DB 정보 반환
    if (fxHistory) {
      console.log('GET /history > try > if');
      res.status(200).json({ fxHistory });
    } else {
      console.log('GET /history > try > else');
      res.status(404).json({ message: `환율 히스토리가 존재하지 않습니다.` });
    }
  } catch (error) {
    // console.log(error);
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and one of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);
    res.status(500).send();
  }
});

export default router;
