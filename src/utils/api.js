import axios from 'axios';

// Axios 기본 설정
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // 로컬 백엔드 서버 URL
  timeout: 10000, // 요청 시간 제한
  withCredentials: true, // 쿠키 전달 허용
});

// 로그인 API 요청
export const loginUser = async ({ email, password, rememberMe }) => {
  try {
    const response = await api.post('/auth/login', { email, password, rememberMe });
    return response.data; // 로그인 성공 시 토큰 등 데이터를 반환
  } catch (error) {
    console.error('로그인 요청 중 오류가 발생했습니다:', error);

    if (error.response) {
      // 백엔드에서 반환한 상태 코드에 따른 에러 메시지 처리
      switch (error.response.status) {
        case 401:
          throw new Error('이메일 또는 비밀번호가 잘못되었습니다. 다시 확인해주세요.');
        case 409:
          throw new Error('이미 로그인된 상태입니다. 로그아웃 후 다시 시도해주세요.');
        default:
          throw new Error('로그인 요청에 실패했습니다. 다시 시도해주세요.');
      }
    }

    // 네트워크 오류 등 기타 에러 처리
    throw new Error('네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

// 로그아웃 API 요청
export const logoutUser = async () => {
  try {
    const response = await api.delete('/auth/logout'); // 로그아웃 요청
    return response.data; // 성공 메시지 반환
  } catch (error) {
    console.error('로그아웃 요청 중 오류가 발생했습니다:', error);
    throw new Error('로그아웃 요청에 실패했습니다.');
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

export const createPost = async (title, content, image) => {
  try {
    const response = await api.post('/posts', {
      author: 1,
      title: title,
      content: content,
      image: image,
    });
    return response.data;
  } catch (error) {
    console.error('게시글 작성 오류');
  }
};

export const readPost = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    const post = response.data.post;
    return post; // 데이터를 반환
  } catch (error) {
    console.error('게시글 읽기 오류');
  }
};

export const readPosts = async () => {
  try {
    const response = await api.get(`/posts`);

    const posts = response.data.posts;
    return posts; // 데이터를 반환
  } catch (error) {
    console.error('게시글목록 읽기 오류');
  }
};

export const deletePost = async (id) => {
  try {
    console.log('deletePost함수 : ', id);
    const response = await api.delete(`/posts/${id}`);
    return response;
  } catch (error) {
    console.error('삭제 오류');
  }
};

export const updatePosts = async (id, title, content) => {
  try {
    console.log('updatePost함수 : ', id, title, content);
    const response = await api.put(`/posts/${id}`, {
      title: title,
      content: content,
    });
    console.log('respose 받기', response);
    return response;
  } catch (error) {
    console.error('업데이트 오류');
  }
};

export const readChartData = async (currency) => {
  try {
    const source = currency.slice(0, 3);
    const target = currency.slice(4, 7);
    const response = await api.get(`/fx/history`, {
      params: {
        source: source, // Currency 데이터 예시(USD/KRW)
        target: target, // 앞 뒤값 잘라서 넣음
      },
    });
    // 소수점 2자리로 변환
    const processedData = response.data.fxHistory.map((item) => ({
      ...item, // 기존 데이터 유지
      fx_rate: Number(item.fx_rate).toFixed(2), // fx_rate만 소수점 2자리로 변환
    }));

    return processedData;
  } catch {
    console.error('환율정보 읽기 오류');
  }
};
export default api;
