import { DocModel, TempDocModel } from './../models/document';
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');

/**
 * 문서 및 다운로드 파일 업로드 Controller
 */
const libraryDocumentFile = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // console.log('destination : ', req.body);

      cb(null, 'app/static/uploads/');
    },
    filename(req, file, cb) {
      console.log('filename : ', req.body);
      const originalname = file.originalname.split('.')[0];
      const fileExtension = file.originalname.split('.')[1];
      // cb(null, new Date().valueOf() + path.extname(file.originalname));
      cb(
        null,
        mongoose.Types.ObjectId().toString() + path.extname(file.originalname)
      );
    },
  }),
  // limits: {
  //   filesSize: 17471,
  // },
});

/**
 * 파일 미리보기(임시) Controller
 */
const previewUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'app/static/temp/');
    },
    filename(req, file, cb) {
      cb(
        null,
        mongoose.Types.ObjectId()._id.toString() +
          path.extname(file.originalname)
      );
    },
  }),
});
module.exports = {
  libraryDocumentFile,
  previewUpload,
};
