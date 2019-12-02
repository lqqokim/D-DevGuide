// eslint-disable-next-line import/named
import { upload } from './../../../controllers/upload';
import { UploadModel } from './../../../models/upload';
import { FileModel, FileProductModel } from './../../../models/download';

const fs = require('fs');

const { Router } = require('express');
const router = Router();

/**
 * 다운로드 > 제품 등록
 */
router.post('/product', (req, res) => {
  const product = req.body;
  const fileProductModel = new FileProductModel(product);

  fileProductModel
    .save()
    .then((project) => {
      res.status(200).send({ success: true, data: project });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 다운로드 > 제품 목록 조회
 */
router.get('/products', (req, res) => {
  FileProductModel.find()
    .then((projects) => {
      res.status(200).send({ success: true, data: projects });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

// 파일 조회
router.get('/list', (req, res, next) => {
  UploadModel.find(function(err, result) {
    console.log(' UploadModel.find :: ', result);
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(result);
  });
});

// 다운로드 > 파일 등록
router.post('/register', upload.single('file'), (req, res) => {
  const { file } = req;
  const data = JSON.parse(req.body.data);
  const filePath = 'app/static/uploads/';

  console.log('[Download 파일정보] ', file);
  console.log('[Download 데이터]', data);

  const fileModel = new FileModel();
  // 사용자 입력 정보
  fileModel.fileTitle = data.fileTitle;
  fileModel.projectId = data.projectId;
  fileModel.productName = data.productName;
  fileModel.empName = data.empName;
  fileModel.deptPath = data.deptPath;
  fileModel.description = data.description;

  fileModel.uploadDate = new Date().getTime();
  fileModel.updateDate = new Date().getTime();
  fileModel.downloadCount = 0;

  // multer 파일 정보
  fileModel.originFileName = file.originalname;
  // fileModel.fileName = file.filename;
  fileModel.fileName = fileModel._id + '.' + file.originalname.split('.')[1];
  // fileModel.filePath = file.filePath;
  fileModel.filePath = filePath + fileModel.fileName;
  fileModel.size = file.size;

  console.log('fileModel :: ', fileModel);

  fileModel
    .save()
    .then((file) => {
      res.status(200).send({ success: true, data: file });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

module.exports = router;
