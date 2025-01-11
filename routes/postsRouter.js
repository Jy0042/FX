import express from 'express';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 로그인 정보를 읽어와서 회원만 게시글 작성/수정/삭제가 가능하게 해야 함
try {
  const query = `
    SELECT *
    FROM users
    WHERE user_id = ?
  `;
  conn = await dbPool.getConnection();
  console.log(`Connected to DB! (id=${conn.threadId})`);
  const row = await conn.query(query, [1]); // 로그인 기능 제작 전이라서 일단 1번 사용자 사용
  console.log(row);
} catch (error) {
  console.log(error);
} finally {
  console.log('in finally');
  conn.release();
}


// 게시글 작성 (수정해야 함)
router.post('/', async (req, res) => {
  const { author, title, content, image } = req.body;
  console.log('POST /');
  try {
    const conn = await dbPool.getConnection();
    const query = `
      INSERT INTO posts (author, title, content, image)
      VALUES (?, ?, ?, ?);
    `;
    const result = await conn.query(query, [author, title, content, image]);
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release(); // 커넥션 풀에 반환
    }
  }
  res.status(201).send({ message: '게시글 저장이 완료되었습니다.' }); // To-Do: 게시글 객체도 같이 전송?
});

// 게시글 조회
router.get('/:id', async (req, res) => {
  const post_id = req.params.id;
  try {
    conn = await dbPool.getConnection();
    const [row] = await conn.query(`
        SELECT *
        FROM posts
        WHERE post_id = ?
      `, [post_id]);
    if (row) {
      res.status(200).send({
        message: '게시글 조회가 완료되었습니다.',
        post: row
      });
    } else {
      res.status(404).send({ message: `${post_id}번 게시글이 존재하지 않습니다.` });
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
})

// 게시글 수정 (수정해야 함)
router.put('/:id', async (req, res) => {
  const post_id = req.params.id;
  const { title, content, image } = req.body;
  console.log('PUT /');
  try {
    conn = await dbPool.getConnection();
    const query = `
        UPDATE posts
        SET title = ?,
            content = ?,
            image = ?
        WHERE post_id = ?
      `;
    const row = await conn.query(query, [title, content, image, post_id]);
  } catch (error) {
    console.log(error);
  } finally {
    res.status(200).send({
      message: '게시글 수정이 완료되었습니다.',
      post: row,
    });
    if (conn) {
      conn.release();
    }
  }
})

// 게시글 삭제 (수정해야 함)
router.delete('/:id', async (req, res) => {
  const post_id = req.params.id;
  console.log('DELETE /');
  try {
    conn = await dbPool.getConnection();
    const query = `
        DELETE FROM posts
        WHERE post_id = ?
      `;
    const row = await conn.query(query, [post_id]);
  } catch (error) {
    console.log(error);
  } finally {
    res.status(200).send({
      message: '게시글 삭제가 완료되었습니다.'
    });
    if (conn) {
      conn.release();
    }
  }
});

export default router;
