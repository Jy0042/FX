import express from 'express';
import bcrypt from 'bcrypt';
import { getDBConnection } from './db.js';
// import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 회원 인증 함수
async function authenticateUser(reqBody, res) {
  const { email, password } = reqBody;

  if (!email || !password) {
    return res.status(400).json({ message: '로그인 실패. 누락 정보 확인 후 다시 로그인해주세요' });
  }

  try {
    // conn = await dbPool.getConnection();
    conn = await getDBConnection();
    const [user] = await conn.query(
      `
      SELECT user_id AS userId,
             email,
             password AS passwordHash,
             nickname,
             profile_image AS profileImage
      FROM users
      WHERE email = ?
    `,
      [email]
    );
    if (user) {
      const match = await bcrypt.compare(password, user.passwordHash);
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
      // await conn.release(); // 커넥션 풀에 반환
      await conn.close(); // 커넥션 연결 닫기
    }
  }
}

// 로그인 상태 확인 (세션 정보 유무 확인) 함수
function isLoggedIn(req) {
  return req.session && req.session.user;
}

// 로그인 상태 확인 ( /api/v1/auth 엔드포인트. 클라이언트가 페이지를 이동할 때마다 요청)
router.get('/', async (req, res) => {
  if (isLoggedIn(req)) {
    res.status(200).json({
      isLoggedIn: true,
      userId: req.session.user.userId,
    });
  } else {
    res.status(401).json({ isLoggedIn: false });
  }
});

// 로그인
router.post('/login', async (req, res) => {
  if (!isLoggedIn(req) && req.body) {
    const user = await authenticateUser(req.body, res);
    delete user.passwordHash;
    if (user) {
      // 새 세션 생성으로 세션 고착 방지
      req.session.regenerate(function (err) {
        if (err) {
          console.error(err);
          next(err);
        }

        req.session.user = user;

        // 바로 세션 저장 (저장 전 client-side에서 새로 고침이 발생해서 세션이 날아가는 것을 예방)
        req.session.save(function (err) {
          if (err) {
            console.error(err);
            next(err);
          }
          // req.session.userId = user.user_id;
          // req.session.profileImage = user.profile_image; // 최대 64KB 소용량이라서 세션에 저장
<<<<<<< HEAD
          return res.status(201).json({ isLoggedIn: true });
        }
=======
        });
        return res.status(201).json({ isLoggedIn: true });
>>>>>>> feature/32-web-server
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
  if (req.session.user) {
    // ※ req.session 존재 유무로 분기하면 안 되니 다른 팀원은 다시 수정하지 말 것!
    // session 객체는 destroy 후에도 다시 생성되서, 그렇게 하면 중복 로그아웃 시도를 막을 수 없음
    // req.session.destroy((err) => {
    req.session.user = null;
    req.session.save(function (err) {
      if (err) next(err);
    });
    req.session.regenerate(function (err) { // 새 세션 생성
      if (!err) {
        // res.clearCookie('connect.sid'); // 세션 쿠키 제거
        res.status(200).json({
          isSuccess: true,
          message: '로그아웃 성공',
        });
      } else {
        console.error('세션 삭제 중 오류 발생:', err);
        res.status(500).json({
          isSuccess: false,
          message: '로그아웃 중 오류가 발생했습니다.',
        });
      }
    });
  } else {
    res.status(409).json({
      isSuccess: false,
      message: '로그인되어 있지 않습니다.',
    });
  }
});

export default router;
