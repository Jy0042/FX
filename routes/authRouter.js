import express from 'express';
// import session from 'express-session';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

async function login(reqBody) {
  const { email, password } = reqBody;
  try {
    // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수
    if (email && password) {
      conn = await dbPool.getConnection();
      const [user] = await conn.query(`
        SELECT email, nickname, profile_image
        FROM users
        WHERE email = ?
        AND password = ?
        `, [email, password]);
      if (user) {
        console.log('user:', user); // TODO. console 확인 해보고 잘 되면 삭제 후 삼항 연산자로 수정
        return user;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release(); // 커넥션 풀에 반환
    }
  }
};

router.post('/login', async (req, res) => {
  console.log('POST /login');
  // 회원 조회
  if (req.body) {
    const user = await login(req.body);
    if (user) {
      req.session.email = user.email;
      req.session.nickname = user.nickname;
      req.session.profileImage = user.profile_image;
      res.status(200).json({ message: '로그인되었습니다.' });
    } else {
      res.status(404).json({ message: '로그인 실패. 회원 정보를 확인하세요' });
    }
  } else {
    res.status(404).json({ message: '로그인 실패. 회원 정보를 확인하세요' });
  }
});

router.delete('/logout', (req, res) => {
  console.log('POST /logout');
  console.log('destory 전', req.session);
  if (req.session.email) {
    req.session.destroy();
  }
  res.status(404).json({ message: '로그인 실패. 회원 정보를 확인하세요' });
  console.log('destory 후', req.session);
});

router.post('/login/naver', (req, res) => {
  console.log('POST /login/naver');
});

router.delete('/logout/naver', (req, res) => {
  console.log('POST /logout/naver');
});

router.post('/login/google', (req, res) => {
  console.log('POST /login/google');
});

router.delete('/logout/google', (req, res) => {
  console.log('POST /logout/google');
});

export default router;
