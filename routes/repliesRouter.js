import express from 'express';
import dbPool from './db.js';

const router = express.Router();
let conn; // DB Connection Pool로부터 얻어온 커넥션을 저장할 변수

router.route('/')
  .get((req, res) => {
    console.log('GET /');
  })
  .post((req, res) => {
    console.log('POST /');
  })
  .put((req, res) => {
    console.log('PUT /');
  })
  .delete((req, res) => {
    console.log('DELETE /');
  });

export default router;
