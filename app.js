import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import debug from 'debug';

// Router
// import fxRouter from './routes/fxRouter';
import usersRouter from './routes/usersRouter.js';
import authRouter from './routes/authRouter.js';
import postsRouter from './routes/postsRouter.js';
import commentsRouter from './routes/commentsRouter.js';
import repliesRouter from './routes/repliesRouter.js';

const PORT = process.env.PORT || 3000;
const app = express();
// const debugLog = new debug('log');
// const debugError = new debug('error');


// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// __dirname은 CommonJS에서 제공하는 전역변수라서, ESM에서는 아래처럼 직접 설정
// 해결책 1. import.meta Object의 속성 사용 (Node.js 20.10 이상)
console.log(`import.meta.dirname: ${import.meta.dirname}`);
console.log(`import.meta.filename: ${import.meta.filename}`);
// 해결책 2. path.resolve() 메서드 사용
// const __dirname = path.resolve();

// Routes
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'index.html'));
  res.sendFile(path.join(import.meta.dirname, 'index.html'));
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
