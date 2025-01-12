import express from 'express';
import dbPool from './db.js';

const router = express.Router();
// DB Connection Pool로부터 얻어온 커넥션을 저장할 변수
// finally에서 반환하기 위해서 블록 밖에서 선언했고, 값 할당 전이라서 let으로 변수를 생성할 수밖에 없다.
let conn;

// 회원 정보 조회
// 아직 로그인 세션 구성이 안 되어 있어서, 임시로 회원 여부를 DB 조회로 판단
async function getUser(userId) {
  try {
    // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수
    conn = await dbPool.getConnection();
    const [user] = await conn.query(`
      SELECT *
      FROM users
      WHERE user_id = ?
    `, [userId]);
    return user;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release(); // 커넥션 풀에 반환
    }
  }
}

// 회원 가입 (사용자 추가) (1차 개발 및 단일 테스트 완료. 통합 테스트 필요)
router.post('/', async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    conn = await dbPool.getConnection();
    const result = await conn.query(`
      INSERT INTO users (email, password, nickname)
      VALUES (?, ?, ?);
    `, [email, password, nickname]);
    res.status(201).json({
      message: '회원 가입이 완료되었습니다',
    });
  } catch (error) {
    console.log(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
        message: '이미 가입한 회원입니다.',
      });
    }
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

// 회원 정보 조회 (1차 개발 및 단일 테스트 완료. 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.get('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);
    if (user?.user_id) {
      res.status(200).json({
        message: '회원 정보 조회가 완료되었습니다.',
        user: user,
      });
    } else {
      res.status(404).json({ message: '회원 정보가 존재하지 않습니다.' });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

// 회원 정보 수정 (1차 개발 및 단일 테스트 완료. 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
// 일단 이메일, 비밀번호, 별명만 수정할 수 있도록 해놓음
// TODO. 프로필 이미지 등도 수정할 수 있게 바꿔야 함
// ※ TODO. 일단 PATCH로 만들었는데, PUT으로 바꾸든지 모든 항목을 수정할 수 있게 변경해야 한다.
router.patch('/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, password, nickname } = req.body;
  try {
    const user = await getUser(userId);
    if (user?.user_id) {
      conn = await dbPool.getConnection();
      // const query = `
      await conn.query(`
        UPDATE users
        SET email = ?,
            password = ?,
            nickname = ?
        WHERE user_id = ?
      `, [email, password, nickname, userId]);
      res.status(200).json({
        message: '회원 정보 수정이 완료되었습니다.',
        user: await getUser(userId),
      });
    } else {
      res.status(404).json({ message: '회원 정보가 존재하지 않습니다.' });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

// 회원 정보 삭제 (회원 탈퇴) (1차 개발 및 단일 테스트 완료. 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);
    if (user?.user_id) {
      conn = await dbPool.getConnection();
      // const query = `
      // `;
      await conn.query(`
        DELETE FROM users
        WHERE user_id = ?
      `, [userId]);
      res.status(200).json({ message: '회원 정보 삭제 (회원 탈퇴)가 완료되었습니다.' });
    } else {
      res.status(404).json({ message: '회원 정보가 존재하지 않습니다.' });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

export default router;
