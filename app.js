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
const debugLog = new debug('log');
const debugError = new debug('error');
const debugDb = new debug('db');

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(session({
  secret: 'kobook2-temporary-key',
  resave: false,
  saveUninitialized: false,
  rolling: true, // 사용자의 활동시 세션과 SID(SessionID) 쿠키의 만료 시간 갱신
  cookie: {
    httpOnly: true, // 클라이언트 측 JS가 쿠키에 접근하지 못하도록 하여, XSS 공격 예방
    secure: false, // HTTPS에서만 쿠키 전송 허용 (보통 개발 환경은 HTTP) false(기본값)로 명시
    maxAge: 24 * 60 * 60 * 1000 // SID 쿠키 유지 시간: 1일 (기본 단위: ms(밀리세컨드))
  }
}));
app.use(cors({
  origin: 'http://localhost:5173', // 프론트엔드의 주소
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // 허용할 HTTP 메서드
  allowedHeaders: ['Content-Type', 'Authorization'], // 허용할 헤더
  credentials: true // 쿠키를 포함한 요청 허용
}));

// __dirname은 CommonJS에서 제공하는 전역변수라서, ESM에서는 아래처럼 직접 설정
// 해결책 1. import.meta Object의 속성 사용 (Node.js 20.10 이상)
// 해결책 2. path.resolve() 메서드 사용
// const __dirname = path.resolve();

// Routing
// Client-side Routing은 React Router에게 위임
// 배포시, 빌드된 FE React 정적 파일을 반환 (React 서버 없이 Express 서버 단독 실행시)
app.get('/', (req, res) => {
  res.sendFile(path.join(import.meta.dirname, 'index.html'));
});

app.use('/api/v1/fx', fxRouter); // 환율 정보
app.use('/api/v1/users', usersRouter); // 회원 정보
app.use('/api/v1/auth', authRouter); // 인증 정보 (로그인, 로그아웃, 로그인(세션) 확인, 소셜로그인)
app.use('/api/v1/posts', postsRouter); // 커뮤니티 게시판 게시글
app.use('/api/v1/comments', commentsRouter); // 게시글에 대한 댓글

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

// 서버 종료 처리
const shutDown = async () => {
  // console.log('Shutting down F(x).com server...');
  debugLog('Shutting down F(x).com server...');

  // 1. Express Server - 새로운 연결(connection) 중단 + 요청을 보내지 않거나 응답을 기다리는 모든 연결 종료
  // DB 커넥션을 요청한 HTTP 요청을 모두 종료하기 전에 우선 실행)
  server.close(() => {
    debugLog('F(x).com server closed!');
  });

  // Express Server의 모든 HTTP(S) 커넥션 닫기 (Active 상태 포함)
  // race condition을 예방하기 위해서 server.close() 다음에 호출할 것을 권장
  server.closeAllConnections();

  // 2. MariaDB Connection Pool 종료 (Resource 반환)
  try {
    await dbPool.end();
    debugDb('MariaDB Connection Pool closed');
  } catch (err) {
    debugDb('Error closing MariaDB connection pool!');
  }

  // 3. Express Server Process 종료
  process.exit(0);
};

process.on('SIGINT', shutDown); // Ctrl + C로 서버를 중단한 경우
process.on('SIGTERM', shutDown); // Kill command로 "
process.on('uncaughtException', () => { // uncaughtException handling
  debugError('Unhandled error:', err);
  shutDown();
});
