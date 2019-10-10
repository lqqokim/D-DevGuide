import { upload } from './../controllers/upload';
import { UploadModel } from './../models/upload';

const { Router } = require('express');
const router = Router();

router.get('/upload', (req, res, next) => {
  res.send('success!');
});

router.post('/upload', upload.single('bin'), (req, res) => {
  const { file, name } = req.body;
  // console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.

  // res.send(req.file); // object를 리턴함
});

module.exports = router;
