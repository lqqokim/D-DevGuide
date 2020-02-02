const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const autoIncrement = require('mongoose-auto-increment');
const DATABASE_URL = 'mongodb://10.110.15.134:27017/dev-doc';
const connection = mongoose.createConnection(DATABASE_URL, {
  useNewUrlParser: true,
});
autoIncrement.initialize(connection);
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
  // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
// mongoose.connect('mongodb://username:password@host:port/database')

// CONNECT TO MONGODB SERVER

// mongoose
//   // .connect(process.env.MONGO_URI, { useMongoClient: true })
//   .connect(DATABASE_URL, mongooseOptions)
//   .then(() => console.info('Successfully connected to mongodb!'))
//   .catch((e) => console.error(e));
//
// app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

mongoose.connect(
  DATABASE_URL,
  // 'mongodb://localhost:27017/dev-doc',
  mongooseOptions,
  (err) => {
    if (err) return console.error(err);
    console.info('mongoose connected!');
  }
);
mongoose.set('debug', true);

app.use(function(err, req, res, next) {
  // Do logging and user-friendly error message display
  // console.error(err.stack);
  // res
  //   .status(500)
  //   .send({ status: 500, message: 'internal error', type: 'internal' });
  res.locals.message = err;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log('res.locals ', res.locals, err);

  // render the error page
  res.status(err.status || 500);
  // res.render('error'); // express render가 아닌 vue에서 render 한다.
  res.send(res.locals);
});

module.exports = {
  path: '/api',
  handler: app,
};
