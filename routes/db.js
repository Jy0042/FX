import dotenv from 'dotenv';
import path from 'path';
import mariadb from 'mariadb';
import { errorMonitor } from 'events';

// ✅ 환경 변수 로드
dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });

// ✅ MariaDB Connection Pool 생성
const dbPool = mariadb.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 20, // 🔥 50 → 20 (과부하 방지)
  acquireTimeout: 15000, // 🔥 30초 → 15초 (대기 시간 단축)
  idleTimeoutMillis: 5000, // 🔥 미사용 연결 5초 후 자동 해제
  waitForConnections: true, // 연결 부족 시 대기
  queueLimit: 0, // 대기열 제한 없음
});

console.log(`${dbPool} db연결 완료`);

// ✅ MariaDB 개별 Connection 생성
async function getDBConnection() {
  try {
    const connection = await dbPool.getConnection();
    console.log('✅ DB 개별 연결 성공');
    return connection;
  } catch (error) {
    console.error(`❌ DB 개별 연결 실패22222 ${error.message} ${error.code} ${error.sqlState}`);
    throw error;
  }
}

// ✅ DB 연결 테스트 함수
async function testDBConnection() {
  let conn;
  try {
    conn = await getDBConnection();
    console.log('✅ MariaDB 연결 확인 완료');
    conn.release();
  } catch (error) {
    console.error('❌ MariaDB 연결 확인 실패:', error.message);
  }
}

// ✅ 모듈 내보내기
export { getDBConnection, dbPool, testDBConnection };
export default dbPool;
