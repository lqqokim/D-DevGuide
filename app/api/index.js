// const path = require('path');
const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

/********************************************************
                  Express Settings
 ********************************************************/
app.use(logger('dev'));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// NODE_ENV 는 입력해야 하는 값 (backend 에서 NODE_ENV=xxx node ./bin/www)
if (process.env.NODE_ENV !== 'production') app.use(cors());

/********************************************************
                Router Path Settings
 ********************************************************/
app.use(require('./routes'));
app.use(require('./routes/product'));

/********************************************************
                  Connect MongoDB
 ********************************************************/
connectDB();

/***
 * TODO: 실제 파일이 적재된 폴더를 static 으로 임의로 설정 해놓음
 *  - 문제: 'express.static' 사용 함으로 /files/filename 경로를 통해 외부 uploads 폴더를 바라보고 파일을 가져오려 했으나 파일을 정상적으로 읽어 오지 못함
 *  - 해결: 임시로 static 경로 하위에 uploads 폴더를 생성
 */
// console.log('path :: ', path.join(__dirname, '../static/uploads'));
// app.use(express.static(__dirname + '/public')); //public 폴더 안에 javascript 파일과 css파일을 모아
// app.use('/files', express.static(path.join(__dirname, '../static/uploads')));

/********************************************************
                  Error Handler
 ********************************************************/
// 등록되지 않은 path로 요청이 왔으면 404 페이지를 만들어야함.
// http-errors 모듈로 error 객체 생성 후 에러 처리 핸들러로 넘김
app.use(function(req, res, next) {
  // error 생성 후 next
  // next(createError(404));
  res.status(404);
  res.send({ msg: '존재하지 않는 API 입니다.' });
});

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  // console.error(err.stack);
  // res
  //   .status(500)
  //   .send({ status: 500, message: 'internal error', type: 'internal' });
  // res.locals.msg = err;

  console.log('err => ', err);

  res.locals.error =
    req.app.get('env') === 'development'
      ? err
      : '서버에러가 발생했습니다. 관리자에게 문의해주세요.';
  console.log('res.locals ', res.locals, res.locals.error, err);

  // render the error page
  res.status(err.status || 500);
  res.send({
    success: false,
    msg: res.locals.error,
  });
  // res.render('error'); // express render가 아닌 vue에서 render 한다.
  // res.send({
  //   success: false,
  //   msg: res.locals.message,
  // });
});

function connectDB() {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  };

  mongoose.connect(process.env.DATABASE_URL, mongooseOptions, (err) => {
    if (err) return console.error(err);
    console.info('mongoose connected!');
  });
}

/********************************************************
  autoIncrement settiong
 ********************************************************/
// const autoIncrement = require('mongoose-auto-increment');
// const connection = mongoose.createConnection(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });
// autoIncrement.initialize(connection);

module.exports = {
  path: '/api',
  handler: app,
};
