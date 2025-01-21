import express from 'express';
import bcrypt from 'bcrypt';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 로그인 함수
async function login(reqBody) {
  const { email, password } = reqBody;

  if (!email || !password) {
    return res.status(400).json({ message: '로그인 실패. 누락 정보 확인 후 다시 로그인해주세요' });
  }

  try {
    conn = await dbPool.getConnection();
    const [user] = await conn.query(
      `
      SELECT user_id, email, password AS passwordHash, nickname, profile_image
      FROM users
      WHERE email = ?
    `,
      [email]
    );
    if (user) {
      const match = await bcrypt.compare(password, user.passwordHash);
      console.log('match:', match);
      return match ? user : null;
    } else {
      res.status(404).json({ message: '회원 정보가 존재하지 않습니다.' });
    }
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    console.error(error);
  } finally {
    if (conn) {
      await conn.release(); // 커넥션 풀에 반환
    }
  }
}

// 로그인 상태 확인 (세션 정보 유무 확인) 함수
function isLoggedIn(req) {
  return req.session && req.session.userId ? true : false;
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
      // 서버 응답 수정
      return res.status(201).json({
        isLoggedIn: true,
        userId: user.user_id, // userId를 응답에 추가
      });
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
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        console.error('세션 삭제 중 오류 발생:', err);
        return res.status(500).json({
          isSuccess: false,
          message: '로그아웃 처리 중 오류가 발생했습니다.',
        });
      }
      res.clearCookie('connect.sid'); // 세션 쿠키 제거
      return res.status(200).json({
        isSuccess: true,
        message: '로그아웃 성공',
      });
    });
  } else {
    return res.status(409).json({
      isSuccess: false,
      message: '로그인되어 있지 않습니다.',
    });
  }
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
