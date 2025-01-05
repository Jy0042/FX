import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import express from 'express';
import mariadb from 'mariadb';

const app = express();
const router = express.Router();
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || 'dbmaria',
  connectionLimit: 5,
});

app.use(express.json());

let conn; // MariaDB connection

// 게시글 작성
router.post('/', async (req, res) => {
  const { author, title, content, image } = req.body;
  console.log('POST /');
  try {
    conn = await pool.getConnection(); // 커넥션 풀에 커넥션 요청
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

router.route('/:id')
  .get(async (req, res) => { // 게시글 조회
    const post_id = req.params.id;
    console.log('GET /');
    try {
      conn = await pool.getConnection();
      const query = `
        SELECT *
        FROM posts
        WHERE post_id = ?
      `;
      const row = await conn.query(query, [post_id]);
    } catch (error) {
      console.log(error);
    } finally {
      res.status(200).send({
        message: '게시글 조회가 완료되었습니다.',
        post: row,
      });
      if (conn) {
        conn.release();
      }
    }
  })
  .put(async (req, res) => { // 게시글 수정
    const post_id = req.params.id;
    const { title, content, image } = req.body;
    console.log('PUT /');
    try {
      conn = await pool.getConnection();
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
  .delete(async (req, res) => { // 게시글 삭제
    const post_id = req.params.id;
    console.log('DELETE /');
    try {
      conn = await pool.getConnection();
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
