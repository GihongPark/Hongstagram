const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const db = require('./models');

dotenv.config();
const app = express();
// sequelize 설정 후 db 생성
// $ npx sequelize db:create
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:3000',],
  credentials: true,  // 쿠키 설정
}));

// 프론트에서 받은 데이터를 req.body안에 넣어줌
// 라우터보다 위에있어야함
app.use(express.json());  // json 데이터
app.use(express.urlencoded({ extended: true }));  // urlEncoded 방식(form-data로 보낼때)
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));

// 라우터
app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);

app.listen(3065, () => {
  console.log('서버 실행 중!');
});