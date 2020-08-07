const express = require('express');
const dotenv = require('dotenv');

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

app.get('/', (req, res) => {
  res.send('hello express');
});

app.listen(3065, () => {
  console.log('서버 실행 중!');
});