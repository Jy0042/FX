import express from 'express';
// import session from 'express-session';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 로그인
async function login(reqBody) {
  const { email, password } = reqBody;
  try {
    // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수
    if (email && password) {
      conn = await dbPool.getConnection();
      const [user] = await conn.query(
        `
        SELECT user_id, email, nickname, profile_image
        FROM users
        WHERE email = ?
        AND password = ?
        `,
        [email, password]
      );
      return user ? user : null;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (conn) {
      conn.release(); // 커넥션 풀에 반환
    }
  }
}

// 로그인 상태 확인 (세션 정보 유무 확인)
function isLoggedIn(req) {
  return req.session.userId ? true : false;
}

// 로그인 상태 확인 ( /api/v1/auth 엔드포인트. 클라이언트가 페이지를 이동할 때마다 요청)
router.get('/', async (req, res) => {
  if (isLoggedIn(req)) {
    res.status(200).json({
      isLoggedIn: true,
      userId: req.session.userId,
    });
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  if (!isLoggedIn(req) && req.body) {
    const user = await login(req.body);
    if (user) {
      req.session.userId = user.user_id;
      req.session.email = user.email;
      req.session.nickname = user.nickname; // Community 별명
      req.session.profileImage = user.profile_image; // 최대 64KB 소용량이라서 세션에 저장
      return res.status(201).json({ isLoggedIn: true });
    } else {
      // 입력 정보에 해당하는 회원 정보 없음
      return res.status(401).json({
        isLoggedIn: false,
        message: '로그인 실패. 회원 정보 확인 후 다시 입력해주세요',
      });
    }
  }
  if (isLoggedIn(req)) {
    res.status(409).json({
      isLoggedIn: true,
      message: '이미 로그인되어 있습니다.',
    });
  } else if (!req.body) {
    res.status(400).json({
      isLoggedIn: false,
      message: '로그인 실패. 누락 정보 확인 후 다시 입력해주세요',
    });
  }
});

// 로그아웃
router.delete('/logout', (req, res) => {
  console.log('destory 전', req.session);
  if (req.session.userId) {
    req.session.destroy();
    res.status(200).json({ isSuccess: true });
  } else {
    res.status(409).json({ isSuccess: false, message: '로그인되어 있지 않습니다.' });
  }
  console.log('destory 후', req.session);
});

// Social Login (우선순위 낮음)
// 1. Naver
router.post('/login/naver', (req, res) => {
  console.log('POST /login/naver');
});

router.delete('/logout/naver', (req, res) => {
  console.log('POST /logout/naver');
});
// 2. Google
router.post('/login/google', (req, res) => {
  console.log('POST /login/google');
});

router.delete('/logout/google', (req, res) => {
  console.log('POST /logout/google');
});

export default router;
