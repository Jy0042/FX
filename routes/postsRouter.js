import express from 'express';
import debug from 'debug';
import dbPool from './db.js';
// import { getUser } from './userRouter.js';

const debugLog = new debug('log');
const debugError = new debug('error');
const debugDb = new debug('db');

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 세션 정보를 읽어와서 회원만 게시글 작성/수정/삭제가 가능하게 해야 함
// 로그인 기능 제작 전이라서 일단 임의 사용자 사용

async function getPost(postId) {
  try {
    conn = await dbPool.getConnection();
    const [post] = await conn.query(`
      SELECT
            p.post_id,
            p.author,
            u.nickname,
            p.title,
            p.content,
            p.view_count,
            p.like_count,
            p.comment_count,
            DATE_FORMAT(created_at, "%X-%m-%d %H:%i:%s") AS created_at,
            DATE_FORMAT(updated_at, "%X-%m-%d %H:%i:%s") AS updated_at,
            p.image
      FROM posts p
      JOIN users u ON p.author = u.user_id
      WHERE post_id = ?
    `, [postId]);
    return post;
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    debugDb(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
}

// 게시글 작성 (1차 개발 및 단위 테스트 완료 / 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.post('/', async (req, res) => {
  const { author, title, content, image } = req.body;
  try {
    conn = await dbPool.getConnection();
    const result = await conn.query(`
      INSERT INTO posts (author, title, content, image)
      VALUES (?, ?, ?, ?);
    `, [author, title, content, image]);
    if (result.affectedRows === 1) {
      res.status(201).json({
        message: '게시글 저장이 완료되었습니다.',
      });
    } else {
      res.status(400).json({ message: '게시글 저장 실패. 누락 정보 확인 후 다시 저장해주세요' });
    }
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    debugDb(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

// 게시글 조회 (1차 개발 및 단위 테스트 완료 / 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await getPost(postId);
    if (post?.post_id) {
      debugDb('게시글 조회 완료');
      res.status(200).json({
        message: '게시글 조회가 완료되었습니다.',
        post: post,
      });
    } else {
      res.status(404).json({ message: `${postId}번 게시글이 존재하지 않습니다.` });
    }
    return post;
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    debugDb(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

// 게시글 수정 (1차 개발 및 단위 테스트 완료 / 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.put('/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content, image } = req.body;
  try {
    // const user = await getUser(userId);
    const { user } = req.session;
    // if (user?.user_id) {
    conn = await dbPool.getConnection();
    const result = await conn.query(`
      UPDATE posts
      SET title = ?,
          content = ?
      WHERE post_id = ?
    `, [title, content, postId]);
    if (result.affectedRows === 1) {
      res.status(200).json({
        message: '게시글 수정이 완료되었습니다.',
      });
    } else {
      res.status(404).json({ message: `${postId}번 게시글이 존재하지 않습니다.` });
    }
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    debugDb(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

// 게시글 삭제 (1차 개발 및 단위 테스트 완료 / 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.delete('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    // const user = await getUser(userId);
    const { user } = req.session;
    // if (user?.user_id) {
    conn = await dbPool.getConnection();
    const result = await conn.query(`
      DELETE FROM posts
      WHERE post_id = ?
    `, [postId]);
    if (result.affectedRows === 1) {
      res.status(200).json({
        message: '게시글 삭제가 완료되었습니다.',
      });
    } else {
      res.status(404).json({ message: `${postId}번 게시글이 존재하지 않습니다.` });
    }
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    debugDb(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

// 전체 게시글 (게시판) 조회 (1차 개발 및 단위 테스트 완료 / 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.get('/', async (req, res) => {
  // const { } = req.params.id;
  // TODO: 검색, 정렬, 페이징
  // /api/v1/posts?q=독일&search_type=all&sort=latest&page=1
  // q: 검색어, search_type: 검색 조건(title, content, all, nickname),
  // sort: 정렬 조건(latest, read, comments, likes), page: 검색할 페이지(위치)
  try {
    conn = await dbPool.getConnection();
    const posts = await conn.query(`
      SELECT
            p.post_id,
            p.author,
            u.nickname,
            p.title,
            p.content,
            p.view_count,
            p.like_count,
            p.comment_count,
            DATE_FORMAT(created_at, "%X-%m-%d %H:%i:%s") AS created_at,
            DATE_FORMAT(updated_at, "%X-%m-%d %H:%i:%s") AS updated_at,
            p.image
      FROM posts p
      JOIN users u ON p.author = u.user_id
    `);
    if (posts) {
      res.status(200).json({
        message: '게시글 전체 (게시판) 조회가 완료되었습니다.',
        posts: posts,
      });
    } else {
      res.status(404).json({ message: `게시글이 존재하지 않습니다.` });
    }
  } catch (error) {
    if (error.code === 'ER_CONNECTION_TIMEOUT') {
      res.status(500).json({ message: 'Connection Timeout' });
    }
    debugDb(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

export default router;
