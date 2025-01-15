import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import path from 'path';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import debug from 'debug';
import dbPool from './routes/db.js';
import cors from 'cors';

// Router
import fxRouter from './routes/fxRouter.js';
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

app.use(express.json());

app.use(
  session({
    secret: 'kobook2-temporary-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // HTTPS가 아닌 경우 false로 설정
      maxAge: 60000, // 세션 유지 시간
    },
  })
);

app.use(
  cors({
    origin: 'http://localhost:5173', // 프론트엔드 주소
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // 허용 메서드
    allowedHeaders: ['Content-Type', 'Authorization'], // 허용 헤더
    credentials: true, // 쿠키 허용
  })
);

// __dirname은 CommonJS에서 제공하는 전역변수라서, ESM에서는 아래처럼 직접 설정
// 해결책 1. import.meta Object의 속성 사용 (Node.js 20.10 이상)
// 해결책 2. path.resolve() 메서드 사용
// const __dirname = path.resolve();

// Routing
// Client-side Routing은 React Router에게 위임
// 배포시, 빌드된 FE React 정적 파일을 반환 (Express 서버 단독 실행시)
app.get('/', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, 'index.html'));
});

app.use('/api/v1/fx', fxRouter); // 환율 정보
app.use('/api/v1/users', usersRouter); // 회원 정보
app.use('/api/v1/auth', authRouter); // 인증 정보 (로그인, 로그아웃, 소셜로그인)
app.use('/api/v1/posts', postsRouter); // 커뮤니티 게시판 게시글
app.use('/api/v1/comments', commentsRouter); // 게시글에 대한 댓글
app.use('/api/v1/replies', repliesRouter); // 댓글에 대한 답글

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error); // 에러 처리 미들웨어로 넘김
});

// 에러 처리
app.use((err, req, res, next) => {
  console.error(err);
  // res.locals.message = err.message;
  // res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.send(process.env.NODE_ENV !== 'production' ? err.message : 'Internal Server Error');
});

const server = app.listen(PORT, () => {
  console.log(`F(x).com server is running on http://localhost:${PORT}`);
});

const shutDown = async () => {
  console.log('Shutting down F(x).com server...');
  try {
    await dbPool.end(); // MariaDB Connection Pool 종료 (Resource 반환)
    console.log('MariaDB Connection Pool closed');
  } catch (err) {
    console.log('Error closing MariaDB connection pool!');
  }
  server.close(() => {
    console.log('F(x).com server closed!');
    process.exit(0);
  });
};

process.on('SIGINT', shutDown); // Ctrl + C로 서버를 중단한 경우
process.on('SIGTERM', shutDown); // Kill command로 "
