import { DocModel, TempDocModel } from './../models/document';
const path = require('path');
const fs = require('fs');
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

      console.log('upload req==========', req);
      console.log('upload file==========', file);

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

const gitUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'app/static/gitUpload/');
    },
    filename: (req, file, cb) => {
      const originalFileName = file.originalname.split('.');
      let fileName = 'none';
      if (originalFileName.length > 0) {
        fileName = `${originalFileName[0]}-${Date.now()}.${
          originalFileName[1]
        }`;
      }
      cb(null, fileName);
    },
  }),
});

const removeFile = (files, callback) => {
  let i = files.length;
  files.forEach((filepath) => {
    fs.unlink(filepath, function(err) {
      i--;
      if (err) {
        callback(err);
        return false;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
};

module.exports = {
  docModel,
  upload,
  tempDocModel,
  previewUpload,
  gitUpload,
};
