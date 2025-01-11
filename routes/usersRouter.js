import express from 'express';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 회원 가입 (사용자 추가)
router.post('/', async (req, res) => {
  const { email, password, nickname } = req.body;
  try {
    conn = await dbPool.getConnection();
    const result = await conn.query(`
      INSERT INTO users (email, password, nickname)
      VALUES (?, ?, ?);
    `, [email, password, nickname]);
    res.status(201).send({
      message: '사용자 추가가 완료되었습니다. (회원 가입 완료)',
    });
  } catch (error) {
    console.log(error);
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).send({
        message: '이미 가입된 사용자입니다.',
      });
    }
  } finally {
    if (conn) {
      conn.release(); // 커넥션 풀에 반환
    }
  }
});

router.route('/:id')
  .get(async (req, res) => { // 사용자 정보 조회
    const post_id = req.params.id;
    // console.log(`post_id = ${post_id}`);
    console.log(`GET /api/v1/posts/${post_id}`);
    try {
      conn = await dbPool.getConnection();
      console.log('try 진입 직후 - await conn.query 직전');
      const row = await conn.query(`
        SELECT *
        FROM posts
        WHERE post_id = ?
      `, [post_id]);

      console.log('try 내부 - await conn.query 직후');
      console.log(row, row[0].title, row[0].content);
      res.status(200).send({
        message: '게시글 조회가 완료되었습니다.',
        post: [row],
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally 진입 직후');
      if (conn) {
        console.log('connection release 직전');
        conn.release();
      }
    }
  })
  .put(async (req, res) => { // 사용자 정보 수정
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
  .delete(async (req, res) => { // 사용자 정보 삭제
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
