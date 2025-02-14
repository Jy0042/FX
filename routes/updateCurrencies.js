import axios from 'axios';
import { getDBConnection } from './db.js';

const top100Currencies = [
  'USD',
  'EUR',
  'JPY',
  'GBP',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'HKD',
  'NZD',
  'SEK',
  'KRW',
  'SGD',
  'NOK',
  'MXN',
  'INR',
  'BRL',
  'ZAR',
  'RUB',
  'TRY',
  'TWD',
  'PLN',
  'THB',
  'IDR',
  'HUF',
  'CZK',
  'ILS',
  'PHP',
  'AED',
  'MYR',
  'CLP',
  'COP',
  'SAR',
  'PEN',
  'RON',
  'DKK',
  'ARS',
  'EGP',
  'VND',
  'BGN',
  'OMR',
  'UAH',
  'KWD',
  'BHD',
  'LKR',
  'QAR',
  'HRK',
  'BND',
  'PKR',
  'ISK',
  'JOD',
  'TND',
  'MAD',
  'NGN',
  'GHS',
  'LBP',
  'UZS',
  'BOB',
  'DZD',
  'AOA',
  'KES',
  'GEL',
  'MOP',
  'CRC',
  'MUR',
  'MNT',
  'NAD',
  'BAM',
];

async function updateAvailableCurrencies() {
  let conn;
  try {
    conn = await getDBConnection();

    console.log('🔄 API에서 통화 목록 가져오는 중...');
    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.CURRENT_API_KEY}/codes`
    );

    const currencies = response.data.supported_codes; // [["USD", "United States Dollar"], ["EUR", "Euro"], ...]

    // 💡 거래량 기준 상위 100개 통화만 필터링
    const filteredCurrencies = currencies.filter(([code]) => top100Currencies.includes(code));

    console.log(`✅ ${filteredCurrencies.length}개 통화 데이터 필터링 완료`);

    // 2. 기존 데이터 삭제 후 다시 채우기
    await conn.query('DELETE FROM available_currencies');

    const values = filteredCurrencies.map(([code, name], index) => [
      index + 1,
      index + 1,
      code,
      name,
    ]);
    await conn.batch(
      'INSERT INTO available_currencies (currency_id, rank, currency_code, currency) VALUES (?, ?, ?, ?)',
      values
    );

    console.log('✅ 통화 목록 업데이트 완료!');
  } catch (error) {
    console.error('❌ 통화 목록 업데이트 중 오류 발생:', error.message);
  } finally {
    if (conn) await conn.close();
  }
}

// 실행
updateAvailableCurrencies();
