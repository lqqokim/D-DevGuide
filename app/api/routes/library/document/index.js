import { DocModel, DocProductModel } from './../../../models/document';
import { upload } from './../../../controllers/upload';

const fs = require('fs');
const { Router } = require('express');
const router = Router();

const PDFImage = require('pdf-image').PDFImage;

/**
 * 문서 프로젝트 등록
 */
router.post('/product', (req, res) => {
  const project = req.body;
  const docProductModel = new DocProductModel(project);

  docProductModel
    .save()
    .then((project) => {
      res.status(200).send({ success: true, data: project });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 프로젝트 목록 조회
 */
router.get('/products', (req, res) => {
  DocProductModel.find()
    .then((projects) => {
      res.status(200).send({ success: true, data: projects });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 상세 조회
 */
router.get('/:docName', (req, res) => {
  DocModel.findOne({ docName: req.params.docName })
    .then((doc) => {
      res.status(200).send({ success: true, data: doc });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품별 문서 목록을 조회
 */
router.post('/list/product', (req, res) => {
  const { productName } = req.body;

  DocModel.find({ productName })
    .then((docs) => {
      res.status(200).send({ success: true, data: docs });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 등록
 */
router.post('/register', upload.single('file'), (req, res) => {
  const { file } = req;
  const data = JSON.parse(req.body.data);

  console.log('[Document 파일정보] ', file);
  console.log('[Document 데이터]', data);

  const pdfImage = new PDFImage(file.path);
  pdfImage
    .convertPage(0)
    .then(function(imagePath) {
      if (
        fs.existsSync(file.destination + file.filename.split('.')[0] + '-0.png')
      ) {
        // console.log('[Thumbnail Complete !!] ', imagePath);
      }

      const docModel = new DocModel();
      // 사용자 입력 정보
      docModel.docTitle = data.docTitle;
      docModel.projectId = data.projectId;
      docModel.productName = data.productName;
      docModel.empName = data.empName;
      docModel.depthPath = data.depthPath;
      docModel.description = data.description;

      docModel.uploadDate = new Date().getTime();
      docModel.updateDate = new Date().getTime();
      docModel.viewCount = 0;

      // multer 파일 정보
      docModel.originDocName = file.originalname;
      docModel.docName = file.filename;
      docModel.docPath = file.path;
      docModel.size = file.size;
      docModel.thumbnailPath = imagePath;

      console.log('docModel :: ', docModel);

      docModel
        .save()
        .then((file) => {
          res.status(200).send({ success: true, data: file });
        })
        .catch((err) => {
          res.status(500).send({ success: false, msg: err.message });
        });
    })
    .catch((err) => {
      console.error(err);
    });
});

/**
 * 문서 업데이트
 */
router.post('/update', (req, res) => {
  const doc = req.body;

  console.log('update doc', doc);

  DocModel.findOneAndUpdate(
    { _id: doc._id },
    { $set: { ...doc } },
    { new: true }
  )
    .then((doc) => {
      res.status(200).send({ success: true, data: doc });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 삭제
 */
router.post('/remove/:_id', (req, res) => {
  const { _id } = req.params;

  // document _id로 document 삭제
  DocModel.deleteOne({ _id })
    .then((result) => {
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Document not found' });
      } else {
        return res.status(200).json({ success: true, data: result });
      }
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

module.exports = router;
