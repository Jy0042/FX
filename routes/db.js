import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import mariadb from 'mariadb';

// MariaDB Connection Pool 생성
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10, // 커넥션 갯수 상한선
  idleTimeout: 20, // 커넥션이 반환된 후 idle timeout 시간. wait_timeout 시스템 변수보다 작아야 한다.
  // leakDetectionTimeout: 5, // 풀에서 빌려온 커넥션에 대해서 몇 초뒤부터 로깅할지 설정.
  // 이상하게 설정 시간과 무관하게 바로 메시지가 나오고, 양도 너무 많아서 DB 오류가 없을 때는 비활성화
  trace: true, // 개발시 initial stack trace 용도
});

export default Object.freeze(pool);
