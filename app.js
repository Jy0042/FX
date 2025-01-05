require('dotenv').config({ path: '.env.development' });
const express = require('express');
const morgan = require('morgan');
const debug = require('debug');

// Router
// const fxRouter = require('./routes/fxRouter');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const postsRouter = require('./routes/postsRouter');
const commentsRouter = require('./routes/commentsRouter');
const repliesRouter = require('./routes/repliesRouter');

const PORT = process.env.PORT || 3000;
const app = express();
// const debugLog = new debug('log');
// const debugError = new debug('error');


// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


// Routes - 
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// 환율 계산
app.get('/api/v1/convert', (req, res) => {
  const { from, amount, to } = req.query;
  // 환율 계산 (외부) API 호출
});

app.use('/api/v1/users', usersRouter); // 회원 정보
app.use('/api/v1/auth', authRouter); // 인증 정보 (로그인, 소셜로그인, 로그아웃)
app.use('/api/v1/posts', postsRouter); // 커뮤니티 게시판 게시글
app.use('/api/v1/comments', commentsRouter); // 게시글에 대한 댓글
app.use('/api/v1/replies', repliesRouter); // 댓글에 대한 답글

app.use((req, res) => {
  res.status(404).send('Not Found');
});


app.listen(PORT, () => {
  console.log(`F(x) server is running on http://localhost:${PORT}`);
});
