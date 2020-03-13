import {
  DocProductModel,
  DocModel,
  TempDocModel,
} from './../../../models/document';
import {
  // eslint-disable-next-line import/named
  libraryDocumentFile,
  // eslint-disable-next-line import/named
  previewUpload,
} from './../../../controllers/libraryDocumentFile';
const path = require('path');
const fs = require('fs');
const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();

const PDFImage = require('pdf-image').PDFImage;

/**
 * _id 로 product data 조회
 */
router.get('/getCurrentProductData', (req, res) => {
  DocProductModel.findOne({
    _id: req.query._id,
  })
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서의 productCode 변경
 */
router.post('/updateDocProductCode', (req, res) => {
  const { prevProductCode, changingProductCode } = req.body;

  DocModel.updateMany(
    { productCode: prevProductCode },
    { productCode: changingProductCode }
  )
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서의 productName 변경
 */
router.post('/updateDocProductName', (req, res) => {
  const { prevProductName, changingProductName } = req.body;

  DocModel.updateMany(
    { productName: prevProductName },
    { productName: changingProductName }
  )
    .then(() => {
      res.status(200).send({ success: true });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 검색
 */
router.get('/searchDocs', (req, res) => {
  DocModel.find({
    docTitle: { $regex: req.query.searchWord },
    // docTitle: { $regex: req.query.searchWord, $options: 'i' }, // 대소문자 구분 없이 데이터 검색
  })
    .then((docs) => {
      res.status(200).send({ success: true, data: docs });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 제품 등록
 */
router.post('/product', (req, res) => {
  const project = req.body;
  const docProductModel = new DocProductModel(project);

  DocProductModel.countDocuments()
    .then((count) => {
      docProductModel.index = count + 1;
      return docProductModel.save();
    })
    .then((project) => {
      res.status(200).send({ success: true, data: project });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 제품 목록 조회
 */
router.get('/products', (req, res) => {
  DocProductModel.find()
    .populate('managedDocs')
    .sort({ index: 1 })
    .then((products) => {
      res.status(200).send({ success: true, data: products });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 프로젝트 등록
 */
router.post('/product', (req, res) => {
  const project = req.body;
  const productModel = new DocProductModel(project);

  productModel
    .save()
    .then((product) => {
      res.status(200).send({ success: true, data: product });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 제품 목록 수정
 */
router.put('/products', (req, res) => {
  const products = req.body;

  const promises = [];

  // 제품 목록 index 수정, _id 제거
  products.map((product, index) => {
    promises.push(
      DocProductModel.findOneAndUpdate(
        {
          productCode: product.productCode,
        },
        { $set: { index: index + 1 } }
      )
    );
  });

  Promise.all(promises)
    .then((products) => {
      res.status(200).send({ success: true, data: products });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 제품 업데이트
 */
router.post('/product/update/:_id', (req, res) => {
  DocProductModel.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
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
});

/**
 * 문서 홈 화면 관리 제품 업데이트
 */
router.post('/updateManagedDoc/:_id', (req, res) => {
  const documents = req.body;

  // documents.map((document, index) => {
  //   document.index = index + 1;
  // });

  DocProductModel.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        managedDocs: documents,
      },
    },
    {
      new: true,
    }
  )
    .then((product) => {
      res.status(200).send({
        success: true,
        data: product,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        msg: err.message,
      });
    });
});

/**
 * 문서 프로젝트 삭제
 */
router.delete('/remove/product/:_id', (req, res) => {
  DocProductModel.deleteOne({ _id: req.params._id })
    .then((result) => {
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Product not found' });
      } else {
        DocProductModel.find()
          .then((products) => {
            res.status(200).send({ success: true, data: products });
          })
          .catch((err) => {
            res.status(500).send({ success: false, msg: err.message });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 제품 조회
 */
router.get('/product/:productCode', (req, res) => {
  DocProductModel.findOne({ productCode: req.params.productCode })
    .then((product) => {
      res.status(200).send({ success: true, data: product });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 상세 조회
 */
router.get('/:_id', (req, res) => {
  DocModel.findOne({ _id: req.params._id })
    .then((doc) => {
      res.status(200).send({ success: true, data: doc });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품에 대한 모든 문서 목록 조회
 */
router.get('/all/:productCode', (req, res) => {
  DocModel.find({ productCode: req.params.productCode })
    .sort('-uploadDate')
    .then((docs) => {
      res.status(200).send({ success: true, data: docs });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품별 문서 목록을 조회
 */
router.get('/list/:productCode', (req, res) => {
  const { productCode } = req.params;
  const { sort, skip, limit } = req.query;

  if (!(sort && skip && limit)) {
    return res.send({ success: false, msg: '잘못된 요청입니다.' });
  }

  let total = 0;

  DocModel.countDocuments({ productCode })
    .then((count) => {
      total = count;

      return DocModel.find({ productCode })
        .sort(sort)
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    })
    .then((result) => {
      res.status(200).send({ success: true, data: { total, result } });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 등록
 */
router.post('/register', libraryDocumentFile.single('file'), (req, res) => {
  const { file } = req;
  const data = JSON.parse(req.body.data);
  const uploadDate = Date.now();

  console.log('[Document 파일정보] ', file);
  console.log('[Document 데이터]', data);

  // pdf 파일 thumbnail 추출
  const pdfImage = new PDFImage(file.path);
  pdfImage
    .convertPage(0)
    .then(function(imagePath) {
      if (
        fs.existsSync(file.destination + file.filename.split('.')[0] + '-0.png')
      ) {
        console.log('[Thumbnail Complete !!] ', imagePath);
      }

      // 파일을 변경한 경우
      if (data._id) {
        const changedDocData = {
          ...data,
          updateDate: uploadDate,
          originDocName: file.originalname,
          docName: file.filename,
          docPath: file.destination + file.filename,
          size: file.size,
          thumbnailPath: imagePath,
          fileExt: path.extname(file.filename).split('.')[1],
        };

        DocModel.findOneAndUpdate(
          { _id: changedDocData._id },
          { $set: changedDocData },
          {
            new: true,
          }
        )
          .then((file) => {
            // 파일 수정전 존재하던 파일
            const files = [
              `app/static/uploads/${data.docName}`,
              `app/static/uploads/${data.docName.split('.')[0]}-0.png`,
            ];

            // temp 폴더에 있는 파일 및 썸네일 이미지 제거
            removeFile(files, function(err) {
              if (err) {
                console.log(err);
              } else {
                // console.log('temp files removed');
              }
            });

            res.status(200).send({ success: true, data: file });
          })
          .catch((err) => {
            res.status(500).send({ success: false, msg: err.message });
          });
      }
      // 새로운 문서 등록
      else {
        const docModel = new DocModel();
        // 사용자 입력 정보

        docModel._id = mongoose.Types.ObjectId(file.filename.split('.')[0]);
        docModel.docTitle = data.docTitle;
        docModel.productCode = data.productCode;
        docModel.productName = data.productName;
        docModel.empId = data.empId;
        docModel.empName = data.empName;
        docModel.deptPath = data.deptPath;
        docModel.description = data.description;

        docModel.uploadDate = uploadDate;
        docModel.updateDate = uploadDate;
        docModel.viewCount = 0;

        // multer 파일 정보
        docModel.originDocName = file.originalname;
        // docModel.docName = file.filename;
        docModel.docName = docModel._id + path.extname(file.originalname); // _id 값을 파일명으로 한다.
        // docModel.docPath = file.path;
        docModel.docPath = file.destination + docModel.docName;
        docModel.size = file.size;
        docModel.thumbnailPath = imagePath;
        docModel.fileExt = path.extname(file.originalname).split('.')[1];

        console.log('docModel :: ', docModel);

        docModel
          .save()
          .then((file) => {
            res.status(200).send({ success: true, data: file });
          })
          .catch((err) => {
            res.status(500).send({ success: false, msg: err.message });
          });
      }

      // temp 폴더 내 파일 모두 삭제 (항상 제거하지 않고 등록시에만 비움)
      fs.readdir('app/static/temp', (err, files) => {
        if (err) throw err;

        if (files.length > 0) {
          for (const file of files) {
            removeFile([path.join('app/static/temp', file)], function(err) {
              if (err) {
                console.log(err);
              } else {
                // console.log('files removed');
              }
            });
          }
        }
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 문서 조회수 업데이트
 */
router.post('/count/:_id', (req, res) => {
  // const video
  DocModel.findOneAndUpdate({ _id: req.params._id }, { $inc: { viewCount: 1 } })
    .then((result) => {
      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 미리보기 파일 업로드
 */
router.post('/preview', previewUpload.single('file'), (req, res) => {
  const { file } = req;
  const uploadDate = Date.now();

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
      const tempDocModel = new TempDocModel();
      // tempDocModel._id = mongoose.Types.ObjectId(file.filename.split('.')[0]);
      // tempDocModel.uploadDate = uploadDate;
      // tempDocModel.updateDate = uploadDate;
      // // tempDocModel.viewCount = 0;
      //
      // // multer 파일 정보
      // tempDocModel.originDocName = file.originalname;
      // tempDocModel.docName = tempDocModel._id + path.extname(file.originalname); // mongodb _id 를 파일명
      // tempDocModel.docPath = file.destination + tempDocModel.docName;
      // tempDocModel.size = file.size;
      // tempDocModel.thumbnailPath = imagePath;
      // tempDocModel.fileExt = path.extname(file.originalname).split('.')[1];
      //
      // console.log('tempDocModel :: ', tempDocModel);

      const data = {
        _id: '',
        uploadDate,
        updateDate: uploadDate,
        originDocName: file.originalname,
        docName: tempDocModel._id + path.extname(file.originalname),
        docPath:
          file.destination + tempDocModel._id + path.extname(file.originalname),
        size: file.size,
        thumbnailPath: imagePath,
        fileExt: path.extname(file.originalname).split('.')[1],
      };

      res.status(200).send({ success: true, data });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        msg: err.message,
      });
    });
});

/**
 * 문서 업데이트
 */
router.post('/update/:_id', (req, res) => {
  const { data } = req.body; // payload.data (사용자 입력 값)
  data.updateDate = Date.now();
  // console.log('문서 업데이트 :::: ', data);

  DocModel.findOneAndUpdate(
    { _id: req.params._id },
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
});

/**
 * 문서 삭제
 */
router.post('/remove/:docName', (req, res) => {
  const { docName } = req.params;
  const { productCode, _id } = req.body;
  let data;
  // document _id로 document 삭제
  DocModel.deleteOne({ _id })
    .then((result) => {
      data = result;
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Document not found' });
      } else {
        return DocProductModel.findOneAndUpdate(
          { productCode },
          {
            $pull: {
              managedDocs: {
                _id,
              },
            },
          }
        );
      }
    })
    .then(() => {
      // 폴더에 있는 파일 및 썸네일 이미지 제거
      removeFile(
        [
          `app/static/uploads/${docName}`,
          `app/static/uploads/${docName.split('.')[0]}-0.png`,
        ],
        function(err) {
          if (err) {
            console.log(err);
          } else {
            // console.log('all files removed');
          }
        }
      );

      res.status(200).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
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

module.exports = router;
