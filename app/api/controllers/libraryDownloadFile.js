import { FileModel } from './../models/download';
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');

/**
 * 문서 및 다운로드 파일 업로드 Controller
 */

// const model = {
//   fileModel: null,
//   get() {
//     return this.fileModel;
//   },
//   set() {
//     this.fileModel = new FileModel();
//   },
// };

const libraryDownloadFile = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'app/static/downloads/');
    },
    filename(req, file, cb) {
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

module.exports = {
  libraryDownloadFile,
};
