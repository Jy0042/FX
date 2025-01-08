const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('temp.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT   
)`);

// const users = [
//     { id: 1, name: 'Alice' },
//     { id: 2, name: 'Bob' },
//     { id: 3, name: 'Charlie' },
// ]

const users = [
  { id: 1, title: 'Alice', content: 'alice@example.com', age: 25 },
  { id: 2, title: 'Bob', content: 'bob@example.com', age: 30 },
  { id: 3, title: 'Charlie', content: 'charlie@example.com', age: 35 },
];
let data = [];
// 각종 미들웨어 셋업
app.use(cors()); // 나는 모든거 다 허용할거야. 끝~ (보안 최악)
// app.use(cors({
//     origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'https://my-domain.com', 'http://my-domain.com', 'http://localhost:5173/'],
//     methods: ['GET', 'POST'],
// }));
app.use(morgan('dev')); // 기본 개발자 디버깅
app.use(express.json());
// API 라우트 셋업
// app.get('/api/users', (req, res) => {
//     // db가 커졌으니... /api/users 전체를 요청할때는, 이 많은것중에 id, name만 전달한다.
//     const summary = users.map(u => ({id: u.id, name: u.name}));

//     res.json(summary);
// });
app.get('/community', (req, res) => {
  // const summary = users.map(u => ({id: u.id, title: u.title, content: u.content}));

  db.all('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    // console.log("사용자 조회 : ", rows);
    data = rows;
  });
  console.log(data);
  // console.log(summary);

  res.json(data);
});

app.post('/api/v1/posts', (req, res) => {
  const { title, content } = req.body;
  const statement = db.prepare(`INSERT into users (title, content) values (?, ?)`);

  statement.run([title, content]);
  console.log(`title: ${title}, content : ${content}`);

  res.json({ success: true });
});

app.get('/api/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // console.log(user);

  res.json(user);
});
app.get('/api/v1/posts/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) throw err;
    // console.log("사용자 조회 : ", rows);
    data = rows;
  });
  const post = data.find((u) => u.id === postId);

  if (!post) {
    return res.status(404).json({ error: 'User not found' });
  }

  console.log(post);

  res.json(post);
});

app.delete('/api/v1/posts/:id', (req, res) => {
  const id = req.params.id;
  db.prepare(
    `
          delete from users where id = ?;
      `
  ).run(id);
  console.log('삭제');

  res.json({ success: true });
});

app.patch('/api/v1/posts/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  try {
    const query = db
      .prepare('UPDATE users SET title = ?, content = ? WHERE id = ?')
      .run(title, content, id);

    res.json({ message: 'updated completed', id: id });
  } catch (error) {
    res.status(500).send('수정 중 오류');
  }
});

app.listen(3000, () => {
  console.log('서버레디');
});
