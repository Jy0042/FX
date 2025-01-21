import express from 'express';
import axios from 'axios';
import debug from 'debug';
import dbPool from './db.js';

const debugLog = new debug('log');
const debugError = new debug('error');
const debugDb = new debug('db');

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 국가 및 통화 목록 제공
router.get('/currencies', async (req, res) => {
  try {
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.CURRENT_API_KEY}/codes`
    );

    const supportedCurrencies = response.data.supported_codes.map(([code, name]) => ({
      code,
      name,
      flag: `https://flagcdn.com/w40/${code.slice(0, 2).toLowerCase()}.png`,
    }));

    res.status(200).json(supportedCurrencies);
  } catch (error) {
    console.error('통화 목록 요청 중 오류 발생:', error.message);
    res.status(500).json({ message: '통화 목록을 가져올 수 없습니다.' });
  }
});

// 환전 계산
router.get('/convert', async (req, res) => {
  const { from, amount, to } = req.query;
  try {
    const fxInfo = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.CURRENT_API_KEY}/pair/${from}/${to}`
    );
    const tempAmount = amount * fxInfo.data.conversion_rate;
    const convertedAmount = to === 'KRW' ? Math.round(tempAmount) : tempAmount;

    if (convertedAmount) {
      res.status(200).json({ to, convertedAmount });
    } else {
      res.status(404).json({ message: '환전 정보가 존재하지 않습니다.' });
    }
  } catch (error) {
    console.error('환전 계산 오류:', error.message);
    res.status(500).send();
  }
});

// 즐겨찾는 환율 쌍 저장
router.post('/users/:userId/user-currency-pair', async (req, res) => {
  const { userId } = req.params;
  const { currencySet } = req.body;

  console.log('Received POST request:', userId);
  console.log('Currency Set:', currencySet);

  // 데이터 검증
  if (
    !Array.isArray(currencySet) ||
    currencySet.some(
      (item) =>
        !Array.isArray(item) || // 각 요소가 배열인지 확인
        item.length < 3 || // 최소 3개의 값(userId, source, target)
        typeof item[0] !== 'number' || // 첫 번째 값은 userId (숫자)
        typeof item[1] !== 'string' || // 두 번째 값은 source (문자열)
        typeof item[2] !== 'string' // 세 번째 값은 target (문자열)
    )
  ) {
    console.error('잘못된 currencySet 데이터:', currencySet);
    return res.status(400).json({
      message: 'currencySet의 각 요소는 최소 세 개의 값(userId, source, target)을 포함해야 합니다.',
    });
  }

  let conn;
  try {
    const currencyMapper = {};
    conn = await dbPool.getConnection();

    // 사용 가능한 통화 정보 가져오기
    const rows = await conn.query(`
      SELECT currency_code, currency_id
      FROM available_currencies
      ORDER BY rank;
    `);

    // 통화 코드를 ID로 매핑
    rows.forEach((row) => {
      currencyMapper[row.currency_code] = row.currency_id;
    });

    console.log('Currency Mapper:', currencyMapper);

    // 데이터 변환
    const convertedCurrencyPairs = currencySet.map((pair) => {
      const [userId, source, target, ...rest] = pair;

      // source와 target 검증
      if (!currencyMapper[source] || !currencyMapper[target]) {
        throw new Error(`Invalid currency codes: ${source} or ${target}`);
      }

      // 변환된 배열 생성
      return [
        userId, // 사용자 ID 그대로
        currencyMapper[source], // 소스 통화 ID
        currencyMapper[target], // 대상 통화 ID
        ...rest, // 나머지 값 유지
      ];
    });

    console.log('Converted Currency Pairs:', convertedCurrencyPairs);

    // INSERT 쿼리 준비
    const insertQuery = `
      INSERT INTO user_currency_pair (user_id, source_id, target_id, sort_order, amount, alert_condition)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await conn.beginTransaction();

    // 일괄 삽입
    const result = await conn.batch(insertQuery, convertedCurrencyPairs);

    await conn.commit();

    console.log('Insert Result:', result);

    if (result.affectedRows === convertedCurrencyPairs.length) {
      res.status(201).json({ message: '즐겨찾는 환율 쌍 저장이 완료되었습니다.' });
    } else {
      res.status(400).json({
        message: '즐겨찾는 환율 쌍 저장이 제대로 완료되지 않았습니다. 관리자에게 문의하세요.',
      });
    }
  } catch (error) {
    if (conn) await conn.rollback();

    console.error('오류 발생:', error.message);

    if (error.message.includes('Invalid currency codes')) {
      res.status(400).json({ message: error.message });
    } else if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: '이미 저장하신 환율 쌍입니다.' });
    } else {
      res.status(500).json({ message: error.message || 'Unknown Error' });
    }
  } finally {
    if (conn) await conn.release();
  }
});

// 즐겨찾는 환율 쌍 조회
router.get('/users/:userId/user-currency-pair', async (req, res) => {
  const { userId } = req.params;
  try {
    conn = await dbPool.getConnection();
    const userCurrencyPairs = await conn.query(
      `
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
    `,
      [userId]
    );

    if (userCurrencyPairs.length > 0) {
      res.status(200).json({
        message: '즐겨찾는 환율 쌍 조회가 완료되었습니다.',
        userCurrencyPairs,
      });
    } else {
      res.status(404).json({ message: '즐겨찾는 환율 쌍이 저장된 게 없습니다.' });
    }
  } catch (error) {
    console.error('조회 오류:', error.message);
    res.status(500).json({ message: 'Unknown Error' });
  } finally {
    if (conn) await conn.release();
  }
});

// 환율 히스토리 조회
router.get('/history', async (req, res) => {
  const { source, target } = req.query;
  try {
    conn = await dbPool.getConnection();
    const fxHistory = await conn.query(
      `
      SELECT
        s.currency_code AS source_currency_code,
        t.currency_code AS target_currency_code,
        h.fx_rate,
        h.date
      FROM fx_rate_history h
      JOIN available_currencies s ON h.source_id = s.currency_id
      JOIN available_currencies t ON h.target_id = t.currency_id
      WHERE s.currency_code = ? AND t.currency_code = ?
      ORDER BY h.date ASC;
    `,
      [source, target]
    );

    if (fxHistory.length > 0) {
      res.status(200).json({
        message: '환율 히스토리 조회가 완료되었습니다.',
        fxHistory,
      });
    } else {
      res.status(404).json({ message: '환율 히스토리가 저장된 게 없습니다.' });
    }
  } catch (error) {
    console.error('히스토리 조회 오류:', error.message);
    res.status(500).json({ message: 'Unknown Error' });
  } finally {
    if (conn) await conn.release();
  }
});

export default router;
