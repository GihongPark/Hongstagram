const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const tagRouter = require('./routes/tag');
const commentRouter = require('./routes/comment');
const likeRouter = require('./routes/like');
const bookmarkRouter = require('./routes/bookmark');

const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
// sequelize 설정 후 db 생성
// $ npx sequelize db:create
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:3000',],
  credentials: true,  // 쿠키 설정
}));

//  front에서 이미지 받아오기위함
app.use('/', express.static(path.join(__dirname, 'uploads')));
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
app.use(passport.initialize());
app.use(passport.session());

// 라우터
app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/tag', tagRouter);
app.use('/comment', commentRouter);
// app.use('/like', likeRouter);
// app.use('/bookmark', bookmarkRouter);

app.listen(3065, () => {
  console.log('서버 실행 중!');
});