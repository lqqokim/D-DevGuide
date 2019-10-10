const path = require('path');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      console.log('file :: ', file);
      console.log('originalname :: ', file.originalname);
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
});

module.exports = {
  upload,
};
