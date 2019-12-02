import { DocProductModel, DocModel } from './../../../models/document';
import {
  // eslint-disable-next-line import/named
  upload,
  // eslint-disable-next-line import/named
  previewUpload,
  // eslint-disable-next-line import/named
  docModel,
  // eslint-disable-next-line import/named
  tempDocModel,
} from './../../../controllers/libraryUploadController';
const fs = require('fs');
const { Router } = require('express');
const mongoose = require('mongoose');
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

      // const docModel = new DocModel();
      // 사용자 입력 정보
      docModel.docTitle = data.docTitle;
      docModel.projectId = data.projectId;
      docModel.productName = data.productName;
      docModel.empName = data.empName;
      docModel.deptPath = data.deptPath;
      docModel.description = data.description;

      docModel.uploadDate = new Date().getTime();
      docModel.updateDate = new Date().getTime();
      docModel.viewCount = 0;

      // multer 파일 정보
      docModel.originDocName = file.originalname;
      // docModel.docName = file.filename;
      docModel.docName = docModel._id + '.' + file.originalname.split('.')[1]; // _id 값을 파일명으로 한다.
      // docModel.docPath = file.path;
      docModel.docPath = file.destination + docModel.docName;
      docModel.size = file.size;
      docModel.thumbnailPath = imagePath;

      console.log('docModel :: ', docModel);

      docModel
        .save()
        .then((file) => {
          // temp 폴더에 있는 문서 제거
          tempDocModel
            .deleteOne({ _id: data._id })
            .then((result) => {
              if (result.n === 0) {
                // return res
                //   .status(404)
                //   .json({ success: false, msg: 'Document not found' });
              } else {
                // return res.status(200).json({ success: true, data: result });
              }
            })
            .catch((err) => {
              console.log('err ', err);
              // res.status(500).send({ success: false, msg: err.message });
            });

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
 * 미리보기 파일 업로드
 */
router.post('/preview', previewUpload.single('file'), (req, res) => {
  const { file } = req;

  console.log('[Preview 파일정보] ', file);
  const pdfImage = new PDFImage(file.path);

  pdfImage
    .convertPage(0)
    .then(function(imagePath) {
      if (
        fs.existsSync(file.destination + file.filename.split('.')[0] + '-0.png')
      ) {
        // console.log('[Thumbnail Complete !!] ', imagePath);
      }

      // 사용자 입력 정보
      // tempDocModel.docTitle = '';
      // tempDocModel.projectId = '';
      // tempDocModel.productName = '';
      // tempDocModel.empName = '';
      // tempDocModel.deptPath = '';
      // tempDocModel.description = '';
      console.log('tempDocModel idd', tempDocModel._id);

      if (tempDocModel) {
        tempDocModel.uploadDate = new Date().getTime();
        tempDocModel.updateDate = new Date().getTime();
        // tempDocModel.viewCount = 0;

        // multer 파일 정보
        tempDocModel.originDocName = file.originalname;
        tempDocModel.docName =
          tempDocModel._id + '.' + file.originalname.split('.')[1]; // mongodb _id 를 파일명
        tempDocModel.docPath = file.destination + tempDocModel.docName;
        tempDocModel.size = file.size;
        tempDocModel.thumbnailPath = imagePath;

        console.log('tempDocModel :: ', tempDocModel);

        tempDocModel
          .save()
          .then((file) => {
            res.status(200).send({ success: true, data: file });
          })
          .catch((err) => {
            res.status(500).send({ success: false, msg: err.message });
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

/**
 * 문서 업데이트
 */
router.post('/update/:_id', (req, res) => {
  if (req.body.formData) {
  } else {
    const data = req.body; // payload.data (사용자 입력 값)

    console.log('문서 업데이트 :::: ', data);

    // DocModel.findOne({ _id: mongoose.Types.ObjectId(req.params._id) }).then(
    //   (res) => {
    //     console.log('findOne', res);
    //   }
    // );

    DocModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(req.params._id) },
      { $set: data },
      {
        new: true,
      }
    )
      .then((doc) => {
        res.status(200).send({ success: true, data: doc });
      })
      .catch((err) => {
        res.status(500).send({ success: false, msg: err.message });
      });
  }
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
