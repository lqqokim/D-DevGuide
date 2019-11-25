const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// app.use(express.static(__dirname + '/public')); //public 폴더 안에 javascript 파일과 css파일을 모아

// NODE_ENV는 입력해야 하는 값 (backend에서 NODE_ENV=xxx node ./bin/www)
console.log('process.env.NODE_ENV :: ', process.env.NODE_ENV);
// app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production') app.use(cors());

app.use(require('./routes'));

// app.use(users);
// app.use(require('./routes/gitlab'));
// app.use(require('./routes/upload'));
// app.use(require('./routes/token'));
// app.use(require('./routes/login'));
app.use(require('./routes/product'));
// app.use(require('./routes/download'));

/***
 * TODO: 실제 파일이 적재된 폴더를 static 으로 임의로 설정 해놓음
 *  - 문제: 'express.static' 사용 함으로 /files/filename 경로를 통해 외부 uploads 폴더를 바라보고 파일을 가져오려 했으나 파일을 정상적으로 읽어 오지 못함
 *  - 해결: 임시로 static 경로 하위에 uplaods 폴더를 생성
 */

// console.log('path :: ', path.join(__dirname, '../static/uploads'));
// app.use('/files', express.static(path.join(__dirname, '../static/uploads')));

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// mongoose 연결
mongoose.connect(
  'mongodb://localhost:27017/dev-doc',
  mongooseOptions,
  (err) => {
    if (err) return console.error(err);
    console.info('mongoose connected!');
  }
);

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  console.error(err.stack);
  res
    .status(500)
    .send({ status: 500, message: 'internal error', type: 'internal' });
});

module.exports = {
  path: '/api',
  handler: app,
};
