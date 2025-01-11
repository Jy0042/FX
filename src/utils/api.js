import axios from 'axios';

// Axios 기본 설정
const api = axios.create({
  baseURL: 'https://v6.exchangerate-api.com/v6/852c6aa0c72c412c722a374b', // API 기본 URL
  timeout: 10000, // 요청 시간 제한
});

// API 요청 함수: 동적 쿼리 파라미터 처리
export const fetchConversionRate = async (from, to, amount) => {
  try {
    // 엔드포인트 경로 생성
    const endpoint = `/pair/${from}/${to}`;
    const response = await api.get(endpoint);

    // 환율 데이터와 계산된 결과 반환
    const exchangeRate = response.data.conversion_rate;
    const convertedAmount = amount * exchangeRate;

    console.log(exchangeRate);

    return { exchangeRate, convertedAmount }; // 변환된 데이터 반환
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

export default api;
