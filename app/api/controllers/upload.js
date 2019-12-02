import { DocModel, TempDocModel } from './../models/document';
const path = require('path');
const multer = require('multer');

/**
 * 문서 및 다운로드 파일 업로드 Controller
 */
const docModel = new DocModel();
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'app/static/uploads/');
    },
    filename(req, file, cb) {
      const originalname = file.originalname.split('.')[0];
      const fileExtension = file.originalname.split('.')[1];
      // cb(null, new Date().valueOf() + path.extname(file.originalname));
      cb(null, docModel._id.toString() + path.extname(file.originalname));
    },
  }),
  // limits: {
  //   filesSize: 17471,
  // },
});

/**
 * 파일 미리보기(임시) Controller
 */
const tempDocModel = new TempDocModel();
const previewUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'app/static/temp/');
    },
    filename(req, file, cb) {
      cb(null, tempDocModel._id.toString() + path.extname(file.originalname));
    },
  }),
});
module.exports = {
  docModel,
  upload,
  tempDocModel,
  previewUpload,
};
