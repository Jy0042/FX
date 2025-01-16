import express from 'express';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

// 게시글을 조회하고 있던 중이라고 해도, 댓글 저장 버튼을 누른 시점에 게시글이 삭제되어 있을 수 있으니
// 저장 직전에 게시글이 존재하는지 다시 조회하고서 바로 댓글을 저장해야 한다.

router.post('/', (req, res) => {
  console.log('POST /');
});

router.get('/:id', (req, res) => {
  console.log('GET /');
});

router.put('/:id', (req, res) => {
  console.log('PUT /');
});

router.delete('/:id', (req, res) => {
  console.log('DELETE /');
});

export default router;
