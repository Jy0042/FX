import express from 'express';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 로그인 정보를 읽어와서 회원만 게시글 작성/수정/삭제가 가능하게 해야 함
// 로그인 기능 제작 전이라서 일단 임의 사용자 사용

// 회원 정보 조회
// 아직 로그인 세션 구성이 안 되어 있어서, 임시로 회원 여부를 DB 조회로 판단
async function getUser(userId) {
  try {
    conn = await dbPool.getConnection();
    const [user] = await conn.query(
      `
      SELECT *
      FROM users
      WHERE user_id = ?
    `,
      [userId]
    );
    return user;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release(); // 커넥션 풀에 반환
    }
  }
}

async function getPost(postId) {
  try {
    conn = await dbPool.getConnection();
    const [post] = await conn.query(
      `
      SELECT *
      FROM posts
      WHERE post_id = ?
    `,
      [postId]
    );
    console.log('getPost 함수 안', post);
    return post;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
}

// 게시글 작성 (1차 개발 완료 / 단일 테스트 및 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.post('/', async (req, res) => {
  const { author, title, content, image } = req.body;
  try {
    conn = await dbPool.getConnection();
    const result = await conn.query(
      `
      INSERT INTO posts (author, title, content, image)
      VALUES (?, ?, ?, ?);
    `,
      [author, title, content, image]
    );
    res.status(201).send({ message: '게시글 저장이 완료되었습니다.' }); // TODO? 게시글 객체도 같이 전송?
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

// 게시글 조회 (1차 개발 및 단일 테스트 완료 / 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await getPost(postId);
    if (post?.post_id) {
      res.status(200).json({
        message: '게시글 조회가 완료되었습니다.',
        post: post,
      });
    } else {
      res.status(404).json({ message: `${postId}번 게시글이 존재하지 않습니다.` });
    }
    return post;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      await conn.release();
    }
  }
});

// 게시글 수정 (1차 개발 완료 / 단일 테스트 및 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.put('/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content, image } = req.body;
  try {
    // const user = await getUser(userId);
    const { user } = req.session;
    // if (user?.user_id) {
    conn = await dbPool.getConnection();
    const post = await conn.query(
      `
      UPDATE posts
      SET title = ?,
          content = ?,
      WHERE post_id = ?
    `,
      [title, content, postId]
    );
    console.log('PUT /posts/:id 안:', row);
    // if (post?.post_id) {
    res.status(200).json({
      message: '게시글 수정이 완료되었습니다.',
      post: row,
    });
    // } else {
    //   res.status(404).json({ message: `${postId}번 게시글이 존재하지 않습니다.` });
    // }
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

// 게시글 삭제 (1차 개발 완료 / 단일 테스트 및 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.delete('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    // const user = await getUser(userId);
    const { user } = req.session;
    // if (user?.user_id) {
    conn = await dbPool.getConnection();
    const row = await conn.query(
      `
      DELETE FROM posts
      WHERE post_id = ?
    `,
      [postId]
    );
    res.status(200).json({
      message: '게시글 삭제가 완료되었습니다.',
    });
    // res.status(404).json({ message: `${postId}번 게시글이 존재하지 않습니다.` });
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

// 전체 게시글 (게시판) 조회 (1차 개발 완료 / 단일 테스트 및 통합 테스트 필요. 완료 후 세션 로그인 기능 연동 필요)
router.get('/', async (req, res) => {
  // const { } = req.params.id;
  // TODO: 검색, 정렬, 페이징
  // /api/v1/posts?q=독일&search_type=all&sort=latest&page=1
  // q: 검색어, search_type: 검색 조건(title, content, all, nickname),
  // sort: 정렬 조건(latest, read, comments, likes), page: 검색할 페이지(위치)
  try {
    conn = await dbPool.getConnection();
    const posts = await conn.query(`
        SELECT *
        FROM posts
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
    console.log(error);
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

export default router;
