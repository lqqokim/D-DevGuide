const express = require('express');
const app = express();

const mongoose = require('mongoose');

// const users = require('./routes/users');
const upload = require('./routes/upload');
const gitlab = require('./routes/gitlab');

app.use(express.static(__dirname + '/public')); //public 폴더 안에 javascript 파일과 css파일을 모아

// app.use(users);
app.use(upload);
app.use(gitlab);

// NODE_ENV는 입력해야 하는 값 (backend에서 NODE_ENV=xxx node ./bin/www)
console.log('process.env.NODE_ENV :: ', process.env.NODE_ENV + 'started!');

mongoose.connect(
  'mongodb://localhost:27017/dev-doc',
  { useNewUrlParser: true },
  (err) => {
    if (err) return console.error(err);
    console.log('mongoose connected!');
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
