import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import express from 'express';
import mariadb from 'mariadb';
import dbPool from './db.js';
import morgan from 'morgan';

const app = express();
const router = express.Router();

if (process.env.NODE_ENV === 'development') {
  console.log('process.env.NODE_ENV === "development"');
  app.use(morgan('dev'));
}

app.use(express.json());

let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수
try {
  const query = `
    SELECT *
    FROM users
    WHERE user_id = ?
  `;
  conn = await dbPool.getConnection();
  console.log(`Connected to DB! (id=${conn.threadId})`);
  const row = await conn.query(query, [1]); // 로그인 기능 제작 전. 일단 1번 사용자 사용
  console.log(row);
} catch (error) {
  console.log(error);
} finally {
  console.log('in finally');
  conn.release();
  // dbPool.end();
}


// 게시글 작성
router.post('/', async (req, res) => {
  const { author, title, content, image } = req.body;
  console.log('POST /');
  try {
    const conn = await pool.getConnection();
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
