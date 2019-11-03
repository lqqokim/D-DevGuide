import { upload } from '@/api/controllers/upload';
import { UploadModel } from '@/api/models/upload';

const { Router } = require('express');
const router = Router();

// 파일 조회
router.get('/', (req, res, next) => {
  UploadModel.find(function(err, result) {
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(result);
  });
});

// 파일 등록
router.post('/', upload.single('file'), (req, res) => {
  const { file } = req;

  console.log('file :: ', file);

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
