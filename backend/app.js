const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 3000;
const dbfile = "mydb.db";
const sqlite = require("better-sqlite3");

const db = new sqlite(dbfile);
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function initializeDatabase() {
  const sql = fs.readFileSync("initSQL.sql", "utf-8");
  const statements = sql.split(";");

  try {
    // sql이 실행되다가 중지되면 전부 캔슬시키는 transaction. 이걸 사용하면 라인바이라인으로 읽음
    db.transaction(() => {
      for (const statement of statements) {
        db.exec(statement);
      }
    })();
  } catch {
    console.log("초기화 오류");
  }
}
initializeDatabase();

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "./index.html");
  res.sendFile(filePath);
});

app.get("/products_weak", (req, res) => {
  const searchProduct = req.query.product;

  const queryString = `SELECT * FROM products WHERE name LIKE '%${searchProduct}%'`;
  const products = db.prepare(queryString).all();
  res.json(products);
});
app.get("/products", (req, res) => {
  const searchProduct = req.query.product;
  const query = "%" + searchProduct + "%";
  try {
    const selectQuery = db.prepare(`SELECT * FROM products WHERE name LIKE ?`);
    const products = selectQuery.all(query);

    if (!products) {
      return res.status(404).send("해당 상품 없음");
    } else {
      console.log("검색결과 : ", products);
      res.json(products);
    }
  } catch (error) {
    res.status(500).send(`서버 오류 ${error}`);
  }
});
app.get("/users", (req, res) => {
  try {
    const table = req.params.table;

    const query = db.prepare(`SELECT * FROM ${table}`);
    const tables = query.all();
    res.json(tables);
  } catch (error) {
    console.log("테이블 조회 중 오류 발생", error.message);
    res.status(500).send(`테이블이 없음 : ${db_table}`);
  }
});
app.post("/users", (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("이름이나 패스워드를 비워둘 수 없음");
    }
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(
      username,
      password
    );
  } catch (error) {
    console.log("사용자 추가 중 오류 발생", error.message);
    res.status(500).send("사용자 추가 중 오류");
  }
});
app.put("/users/:id", (req, res) => {
  // 사용자 정보를 바꾸려면 어떻게 해야할까?
  const id = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  const fields = [];
  const values = [];
  if (username !== undefined) {
    fields.push("username = ?");
    values.push(username);
  }
  if (password !== undefined) {
    fields.push("password = ?");
    values.push(password);
  }
  if (fields.length === 0) {
    return res.status(400).send("변경할 필드가 없다.");
  }
  try {
    const query = db.prepare(
      `UPDATE users SET ${fields.join(", ")} WHERE id = ?`
    );
    query.run(values);
    res.send(`사용자 수정 완료 : ${id}`);
  } catch (error) {
    res.status(500).send("수정 중 오류");
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  try {
    db.prepare("DELETE FROM users WHERE id = ?").run(userId);
    res.send(`사용자 삭제 완료 ${userId}`);
  } catch (error) {
    console.log(400).send(`사용자 삭제 중 오류 : ${error.message}`);
  }
});
app.get("/:table/:id", (req, res) => {
  const db_table = req.params.table;
  const id = req.params.id;

  try {
    const user = db.prepare(`SELECT * FROM ${db_table} WHERE id = ?`).run(id);
    if (!user) {
      return res.status(404).send("사용자 없음");
    }
    res.json(row);
  } catch (error) {
    console.log("유저 조회 중 오류 발생", error.message);
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  

  try {
    const user = db.prepare().get(username, password);

    if (!user) {
      return res.status(404).send("사용자 없음");
    }
    res.json(user);
  } catch (error) {
    console.log("로그인 중 오류 발생", error.message);
    res.status(500).send("로그인 중 오류 발생");
  }
});
app.listen(port, () => {
  console.log("서버 레디 온 ", port);
});
