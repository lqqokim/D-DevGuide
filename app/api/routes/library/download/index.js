import { upload } from './../../../controllers/upload';
import { UploadModel } from './../../../models/upload';
const fs = require('fs');

const { Router } = require('express');
const router = Router();
const PDFImage = require('pdf-image').PDFImage;

// 파일 조회
router.get('/list', (req, res, next) => {
  UploadModel.find(function(err, result) {
    console.log(' UploadModel.find :: ', result);
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(result);
  });
});

// 파일 등록
router.post('/upload', upload.single('file'), (req, res) => {
  const { file } = req;

  console.log('file ::: ', file);

  const pdfImage = new PDFImage(file.path);
  pdfImage.convertPage(0).then(function(imagePath) {
    // 0-th page (first page) of the slide.pdf is available as slide-0.png
    if (
      fs.existsSync(file.destination + file.filename.split('.')[0] + '-0.png')
    ) {
      console.log('[Thumbnail Complete !!] ', imagePath);
    }
  });

  const uploadModel = new UploadModel();
  uploadModel.name = file.filename;
  uploadModel.originalName = file.originalname;
  uploadModel.mimeType = file.mimetype;
  uploadModel.encoding = file.encoding;
  uploadModel.size = file.size;

  uploadModel.save(function(err) {
    if (err) {
      console.error(err);
      res.json({ result: 0 });
      return;
    }

    res.json({ result: 1 });
  });
});

module.exports = router;
