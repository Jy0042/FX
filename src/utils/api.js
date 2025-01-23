import axios from 'axios';
// import multer from 'multer';

// Axios 기본 설정
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // 공통 URL
  timeout: 10000, // 요청 시간 제한
  withCredentials: true, // 쿠키 전달 허용
});

// 에러 처리 공통 함수
const handleError = (error) => {
  const status = error.response?.status;
  const message =
    error.response?.data?.message || error.message || '요청 처리 중 오류가 발생했습니다.';

  // 디버깅 로그
  console.error(`[API 요청 오류] 상태코드: ${status || 'Unknown'}, 메시지: ${message}`);

  // 사용자에게 표시할 에러 메시지
  if (status === 401) {
    throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
  } else if (status === 403) {
    throw new Error('접근 권한이 없습니다.');
  } else {
    throw new Error(message);
  }
};

// 로그인 API 요청
export const loginUser = async ({ email, password, rememberMe }) => {
  try {
    const response = await api.post('/auth/login', { email, password, rememberMe });
    console.log('로그인 응답:', response.data);

    // 응답 데이터 처리
    const { isLoggedIn } = response.data || {};
    if (!isLoggedIn) {
      throw new Error(response.data.message || '로그인에 실패했습니다.');
    }

    // 로그인 성공 시 응답 반환
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 세션 상태 확인
export const checkSession = async () => {
  try {
    const response = await api.get('/auth');
    console.log('세션 상태 확인 응답:', response.data);

    return response.data; // 세션 상태 반환
  } catch (error) {
    handleError(error);
  }
};

// 로그아웃 API 요청
export const logoutUser = async () => {
  try {
    const response = await api.delete('/auth/logout');
    console.log('로그아웃 응답:', response.data);

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 환율 계산 API 요청
export const getRate = async (from, to, amount) => {
  console.log('환율 계산 API 호출:', { from, to, amount }); // 디버깅용 로그
  try {
    const response = await api.get('/fx/convert', {
      params: { from, to, amount },
    });
    console.log('API 응답 데이터:', response.data); // 디버깅용 로그

    const { convertedAmount, to: targetCurrency } = response.data;
    if (!convertedAmount) {
      console.error('유효하지 않은 응답 데이터:', response.data);
      throw new Error('환율 계산 결과가 유효하지 않습니다.');
    }

    console.log('환율 계산 결과:', { convertedAmount, targetCurrency });
    return { convertedAmount, targetCurrency };
  } catch (error) {
    console.error('환율 계산 중 오류 발생:', error.message);
    throw new Error('환율 계산에 실패했습니다. 다시 시도해주세요.');
  }
};

// 저장된 계산기(환율 쌍) 불러오기
export const getSavedCalculators = async (userId) => {
  try {
    const response = await api.get(`/fx/users/${userId}/user-currency-pair`);

    // response.data 확인 및 처리
    const { userCurrencyPairs, message } = response.data;

    if (!userCurrencyPairs || userCurrencyPairs.length === 0) {
      console.info(message || '저장된 환율 쌍이 없습니다. 새로 저장하세요.');
      return [];
    }

    // 데이터 매핑 처리
    return userCurrencyPairs.map((pair, index) => ({
      id: index + 1,
      amount: pair.amount || 1,
      fromCurrency: pair.source_currency_code,
      toCurrency: pair.target_currency_code,
      result: null,
      error: null,
    }));
  } catch (error) {
    console.error('저장된 계산기 불러오기 실패:', error.message);
    throw new Error('저장된 계산기를 불러오는 데 실패했습니다.');
  }
};

// 즐겨찾는 통화 쌍 저장 API 요청
export const saveCurrencyPair = async (userId, currencySet) => {
  // 데이터 검증 추가
  if (
    !Array.isArray(currencySet) ||
    currencySet.some((row) => row.length < 3) // 최소 source, target 포함 확인
  ) {
    console.error('잘못된 currencySet 데이터:', currencySet);
    throw new Error(
      'currencySet의 각 요소는 최소 세 개의 값(userId, source, target)을 포함해야 합니다.'
    );
  }

  try {
    console.log('환율 쌍 저장 요청 데이터:', currencySet); // 디버깅용 로그
    const response = await api.put(`/fx/users/${userId}/user-currency-pair`, currencySet);
    console.log('환율 쌍 저장 응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('환율 쌍 저장 중 오류 발생:', error.message);
    throw new Error('환율 쌍 저장에 실패했습니다.');
  }
};

// 회원가입 API 요청
export const register = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 인증 코드 발송 API 요청
export const sendCode = async (email) => {
  try {
    const response = await api.post('/auth/send-code', { email });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 인증 코드 검증 API 요청
export const verifyCode = async (email, code) => {
  try {
    const response = await api.post('/auth/verify-code', { email, verificationCode: code });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 게시글 관련 API (생성, 읽기, 수정, 삭제)
export const createPost = async (title, content, image) => {
  try {
    console.log('createpost 이미지 확인 : ', title, content, image);
    const response = await api.post('/posts', {
      author: 1,
      title: title,
      content: content,
      image: image,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const readPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    console.log('readpost data :', response);
    const post = response.data.post;
    console.log('post data :', post.image);

    return post; // 데이터를 반환
  } catch (error) {
    handleError(error);
  }
};

export const readPosts = async () => {
  try {
    const response = await api.get(`/posts`);
    // console.log('response', response);
    const posts = response.data.posts;
    // console.log('posts:', posts);
    return posts; // 데이터를 반환
  } catch (error) {
    handleError(error);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updatePosts = async (id, title, content) => {
  try {
    const response = await api.put(`/posts/${id}`, { title, content });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// 환율 데이터 조회
export const readChartData = async (currency) => {
  try {
    const [source, target] = currency.split('/');
    const response = await api.get('/fx/history', { params: { source, target } });
    return response.data.fxHistory;
  } catch (error) {
    handleError(error);
  }
};

export default api;
