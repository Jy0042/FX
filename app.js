require('dotenv').config({ path: '.env.development' });
const express = require('express');
const morgan = require('morgan');
const debug = require('debug');

// Router
const fxRouter = require('./routes/fxRouter');
const usersRouter = require('./routes/usersRouter');
const postsRouter = require('./routes/postsRouter');
const commentsRouter = require('./routes/commentsRouter');
const repliesRouter = require('./routes/repliesRouter');

const PORT = process.env.PORT || 3000;
const app = express();
// const debugLog = new debug('log');
// const debugError = new debug('error');


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Route - 사용자
app.get('/', (req, res) => {
    res.redirect('/users');
});

app.use('/api/users', usersRouter); // 회원 정보


app.listen(PORT, () => {
    console.log(`F(x) server is running on http://localhost:${PORT}`);
});
