import dotenv from 'dotenv';
dotenv.config({ path: '.env.development' });
import mariadb from 'mariadb';

// MariaDB Connection Pool 생성 (커넥션 5개)
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
});

export default Object.freeze(pool);
