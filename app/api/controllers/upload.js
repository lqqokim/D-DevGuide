const path = require('path');
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'app/static/uploads/');
    },
    filename(req, file, cb) {
      console.log('[Multer File] ', file);
      const originalname = file.originalname.split('.')[0];
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    },
  }),
  // limits: {
  //   filesSize: 17471,
  // },
});

module.exports = {
  upload,
};
