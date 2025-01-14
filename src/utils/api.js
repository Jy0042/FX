import axios from 'axios';

// Axios 기본 설정
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // 로컬 백엔드 서버 URL
  timeout: 10000, // 요청 시간 제한
});

// 로그인 API 요청
export const loginUser = async ({ email, password, rememberMe }) => {
  try {
    const response = await api.post('/auth/login', { email, password, rememberMe });
    return response.data; // 로그인 성공 시 토큰 등 데이터를 반환
  } catch (error) {
    console.error('로그인 요청 중 오류가 발생했습니다:', error);
    if (error.response && error.response.status === 401) {
      throw new Error('이메일 또는 비밀번호가 잘못되었습니다. 다시 확인해주세요.');
    }
    throw new Error('로그인 요청에 실패했습니다. 다시 시도해주세요.');
  }
};

// 환율 계산 API 요청
export const getRate = async (from, to, amount) => {
  try {
    const response = await api.get('/fx/convert', {
      params: { from, to, amount },
    });

    console.log('API 응답 데이터:', response.data); // 디버깅용 로그
    const { convertedAmount, to: targetCurrency } = response.data;

    if (!convertedAmount || !targetCurrency) {
      throw new Error('API 응답 데이터가 유효하지 않습니다.');
    }

    // 반환 데이터에서 exchangeRate 제거
    return { convertedAmount, targetCurrency };
  } catch (error) {
    console.error('환율 계산 중 오류가 발생했습니다:', error);
    throw new Error('환율 계산에 실패했습니다. 다시 시도해주세요.');
  }
};

// 즐겨찾는 통화 쌍 저장 API 요청
export const saveCurrencyPair = async (userId, currencySet) => {
  try {
    const response = await api.post(`/users/${userId}/currency`, {
      userCurrency: { userId, currencySet },
    });
    return response.data; // 성공 메시지 반환
  } catch (error) {
    console.error('즐겨찾는 통화 쌍 저장 중 오류가 발생했습니다:', error);
    throw new Error('즐겨찾는 통화 쌍을 저장하는 데 실패했습니다. 다시 시도해주세요.');
  }
};

// 회원가입 API 요청
export const register = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data; // 성공 메시지 반환
  } catch (error) {
    console.error('회원가입 중 오류가 발생했습니다:', error);
    if (error.response && error.response.status === 400) {
      throw new Error('이미 가입된 이메일입니다. 다른 이메일을 사용해주세요.');
    }
    throw new Error('회원가입에 실패했습니다. 다시 시도해주세요.');
  }
};

// 인증 코드 발송 API 요청
export const sendCode = async (email) => {
  try {
    const response = await api.post('/auth/send-code', { email });
    return response.data;
  } catch (error) {
    console.error('인증 코드 발송 중 오류가 발생했습니다:', error);
    throw new Error('인증 코드를 발송할 수 없습니다. 다시 시도해주세요.');
  }
};

// 인증 코드 검증 API 요청
export const verifyCode = async (email, code) => {
  try {
    const response = await api.post('/auth/verify-code', {
      email,
      verificationCode: code,
    });
    return response.data;
  } catch (error) {
    console.error('인증 코드 검증 중 오류가 발생했습니다:', error);
    if (error.response && error.response.status === 400) {
      throw new Error('인증 코드가 유효하지 않습니다. 다시 확인해주세요.');
    }
    throw new Error('인증 코드 검증에 실패했습니다. 다시 시도해주세요.');
  }
};

export default api;
