import express from 'express';
import bcrypt from 'bcrypt';
import { getDBConnection } from './db.js';
// import dbPool from './db.js';

const router = express.Router();
// DB Connection Pool로부터 얻어온 커넥션을 저장할 변수
// finally에서 반환하기 위해서 블록 밖에서 선언했고, 값 할당 전이라서 let으로 변수를 생성할 수밖에 없다.
let conn;
// 암호화용 salt - rounds 10: ~10 hashes/sec, 11: ~5 hashes/sec, 12: 2-3 hashes/sec
// 대기시간 등 UX를 위해서 10으로 설정
const SALT_ROUNDS = 10;

// 회원 정보 조회
// 아직 로그인 세션 구성이 안 되어 있어서, 임시로 회원 여부를 DB 조회로 판단
export async function getUser(userId) {
  try {
    // conn = await dbPool.getConnection();
    conn = await getDBConnection();
    const [user] = await conn.query(`
      SELECT *
      FROM users
      WHERE user_id = ?
    `, [userId]);
    return user;
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    console.log(error);
  } finally {
    if (conn) {
      // await conn.release(); // 커넥션 풀에 반환
      await conn.close(); // 커넥션 연결 닫기
    }
  }
}

// 회원 가입 (사용자 추가) (1차 개발 및 단위 테스트 완료. 통합 테스트 필요)
router.post('/', async (req, res) => {
  const { email, password, nickname } = req.body;

  if (!email || !password || !nickname) {
    return res.status(400).json({ message: '회원 가입 실패. 누락 정보 확인 후 다시 입력해주세요' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    // conn = await dbPool.getConnection();
    conn = await getDBConnection();
    const result = await conn.query(`
      INSERT INTO users (email, password, nickname)
      VALUES (?, ?, ?);
    `, [email, passwordHash, nickname]);
    res.status(201).json({
      message: '회원 가입이 완료되었습니다',
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({
        message: '이미 가입한 회원입니다.',
      });
    } else if (error.code === 45012 || error.code == 45028) {
      // if 'ER_CONNECTION_TIMEOUT' OR 'ER_GET_CONNECTION_TIMEOUT'
      res.status(500).json({ message: 'Connection Timeout' });
    } else {
      console.log('암호화 실패', error.stack);
      res.status(400).json({ message: '암호화 실패. 문자, 숫자, 기호, 특수문자만 입력해주세요' });
    }
  } finally {
    if (conn) {
      // await conn.release();
      await conn.close();
    }
  }
});

// 회원 정보 조회 (1차 개발 및 단위 테스트 완료. 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
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
      // await conn.release();
      await conn.close();
    }
  }
});

// 회원 정보 수정 (1차 개발 및 단위 테스트 완료. 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
// 일단 이메일, 비밀번호, 별명만 수정할 수 있도록 해놓음
// TODO. 프로필 이미지 등도 수정할 수 있게 바꿔야 함
// ※ TODO. 일단 PATCH로 만들었는데, PUT으로 바꾸든지 모든 항목을 수정할 수 있게 변경해야 한다.
router.patch('/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, password, nickname } = req.body;

  if (!email || !password || !nickname) {
    return res.status(400).json({ message: '회원 정보 수정 실패. 누락 정보 확인 후 다시 입력해주세요' });
  }

  try {
    const user = await getUser(userId);
    if (user?.user_id) {
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      // conn = await dbPool.getConnection();
      conn = await getDBConnection();
      // const query = `
      await conn.query(`
        UPDATE users
        SET email = ?,
            password = ?,
            nickname = ?
        WHERE user_id = ?
      `, [email, passwordHash, nickname, userId]);
      res.status(200).json({
        message: '회원 정보 수정이 완료되었습니다.',
        user: await getUser(userId),
      });
    } else {
      res.status(404).json({ message: '회원 정보가 존재하지 않습니다.' });
    }
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    console.log(error);
  } finally {
    if (conn) {
      // await conn.release();
      await conn.close();
    }
  }
});

// 회원 정보 삭제 (회원 탈퇴) (1차 개발 및 단위 테스트 완료. 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.delete('/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUser(userId);
    if (user?.user_id) {
      // conn = await dbPool.getConnection();
      conn = await getDBConnection();
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
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    console.log(error);
  } finally {
    if (conn) {
      // await conn.release();
      await conn.close();
    }
  }
});

export default router;
