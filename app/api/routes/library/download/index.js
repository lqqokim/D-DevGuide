import {
  // eslint-disable-next-line import/named
  libraryDownloadFile,
} from './../../../controllers/libraryDownloadFile';
import { UploadModel } from './../../../models/upload';
import { FileModel, FileProductModel } from './../../../models/download';
import { VideoProductModel } from '~/api/models/video';
import { ForumPostModel } from '~/api/models/forum';
const fs = require('fs');

const mongoose = require('mongoose');

const { Router } = require('express');
const router = Router();

/**
 * 모든 파일 목록 조회
 */
router.get('/searchDownloads', (req, res) => {
  const { searchWord } = req.query;
  let searchResult = [];

  FileModel.find({
    fileTitle: { $regex: searchWord },
  })
    .then((titleSearchResults) => {
      searchResult = titleSearchResults;
      FileModel.find({ description: { $regex: searchWord } })
        .then((descriptionSearchResult) => {
          searchResult = searchResult.concat(descriptionSearchResult);
          res.status(200).send({ success: true, data: searchResult });
        })
        .catch((err) => {
          res.status(500).send({ success: false, msg: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품코드별 다운로드 파일 검색결과 조회
 */
router.get('/searchDownloads/:productCode', (req, res) => {
  const { productCode } = req.params;
  const { searchWord, sort, skip, limit } = req.query;

  const findOptions = {
    productCode,
    $or: [
      {
        fileTitle: {
          $regex: searchWord,
        },
      },
      {
        description: {
          $regex: searchWord,
        },
      },
    ],
  };

  let total = 0;

  FileModel.countDocuments(findOptions)
    .then((count) => {
      total = count;

      return FileModel.find(findOptions)
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
 * 다운로드 > 제품 등록
 */
router.post('/product', (req, res) => {
  const product = req.body;
  const fileProductModel = new FileProductModel(product);

  FileProductModel.countDocuments()
    .then((count) => {
      fileProductModel.index = count + 1;
      return fileProductModel.save();
    })
    .then((project) => {
      res.status(200).send({ success: true, data: project });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 다운로드 제품 목록 수정
 */
router.put('/products', (req, res) => {
  const products = req.body;

  const promises = [];

  // 제품 목록 index 수정, _id 제거
  products.map((product, index) => {
    promises.push(
      FileProductModel.findOneAndUpdate(
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
 * 다운로드 제품 수정
 */
router.post('/product/update/:_id', (req, res) => {
  FileProductModel.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
    {
      new: true,
    }
  )
    .then((file) => {
      res.status(200).send({ success: true, data: file });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 다운로드 홈 화면 관리 데이터 업데이트
 */
router.post('/updateManagedFile/:_id', (req, res) => {
  FileProductModel.findOneAndUpdate(
    { _id: req.params._id },
    { $set: { managedFiles: req.body } },
    {
      new: true,
    }
  )
    .then((file) => {
      res.status(200).send({ success: true, data: file });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 다운로드 프로젝트 삭제
 */
router.delete('/remove/product/:_id', (req, res) => {
  FileProductModel.deleteOne({ _id: req.params._id })
    .then((result) => {
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Product not found' });
      } else {
        FileProductModel.find()
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
 * 다운로드 > 제품 조회
 */
router.get('/product/:productCode', (req, res) => {
  FileProductModel.findOne({ productCode: req.params.productCode })
    .then((product) => {
      res.status(200).send({ success: true, data: product });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 다운로드 > 제품 목록 조회
 */
router.get('/products', (req, res) => {
  FileProductModel.find()
    .sort({ index: 1 })
    .then((projects) => {
      res.status(200).send({ success: true, data: projects });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 다운로드 파일 다운로드 수 업데이트
 */
router.post('/count/:_id', (req, res) => {
  // const video
  FileModel.findOneAndUpdate(
    { _id: req.params._id },
    { $inc: { downloadCount: 1 } }
  )
    .then((result) => {
      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품에 대한 모든 다운로드 파일 목록을 조회
 */
router.get('/all/:productCode', (req, res) => {
  FileModel.find({ productCode: req.params.productCode })
    .then((files) => {
      res.status(200).send({ success: true, data: files });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품에 대한 다운로드 파일 목록을 조회
 */
router.get('/list/:productCode', (req, res) => {
  const { productCode } = req.params;
  const { sort, skip, limit } = req.query;
  if (!(sort && skip && limit)) {
    return res.send({ success: false, msg: '잘못된 요청입니다.' });
  }

  let total = 0;

  FileModel.countDocuments({ productCode })
    .then((count) => {
      total = count;

      return FileModel.find({ productCode })
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

  // FileModel.find({ productCode: req.params.productCode })
  //   .then((videos) => {
  //     res.status(200).send({ success: true, data: videos });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({ success: false, msg: err.message });
  //   });
});

/**
 * _id로 파일 정보 조회
 */
router.get('/file/:_id', (req, res) => {
  FileModel.findOne({ _id: req.params._id })
    .then((file) => {
      res.status(200).send({ success: true, data: file });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 모든 제품에 대한 파일 목록 조회 (자료실 메인사용)
 */
router.post('/listByAllProduct', (req, res, next) => {
  FileProductModel.find()
    .then((products) => {
      const productList = [];

      if (products.length) {
        products.map((product) => {
          productList.push({
            productName: product.productName,
            productCode: product.productCode,
            _id: product._id,
            description: product.description,
            staffs: product.staffs,
            files: [],
          });
        });

        FileModel.find()
          .then((files) => {
            files.map((file) => {
              const productIdx = productList.findIndex((product) => {
                return product.productCode === file.productCode;
              });

              productList[productIdx].files.push(file);
            });

            res.status(200).send({ success: true, data: productList });
          })
          .catch((err) => {
            res.status(500).send({ success: false, msg: err.message });
          });
      } else {
        res
          .status(200)
          .send({ success: true, data: [], msg: '등록된 제품이 없습니다.' });
      }
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 다운로드 > 문서 업데이트 ( 파일 변경을 제외한 수정 )
 */
router.post('/update/:_id', (req, res) => {
  const { data } = req.body; // payload.data (사용자 입력 값)

  FileModel.findOneAndUpdate(
    { _id: req.params._id },
    { $set: data },
    {
      new: true,
    }
  )
    .then((file) => {
      res.status(200).send({ success: true, data: file });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 다운로드 > 파일 등록 ( 파일 변경 수정 포함 )
 */
router.post('/register', libraryDownloadFile.single('file'), (req, res) => {
  const { file } = req;
  const data = JSON.parse(req.body.data);
  const filePath = 'app/static/downloads/';

  console.log('[Download 파일정보] ', file);
  console.log('[Download 데이터]', data);

  // 파일을 변경한 경우
  if (data._id) {
    data.updateDate = Date.now();
    data.originFileName = file.originalname;
    data.fileName = file.filename;
    data.filePath = file.path;
    data.size = file.size;

    FileModel.findOneAndUpdate(
      { _id: data._id },
      { $set: data },
      {
        new: true,
      }
    )
      .then((file) => {
        res.status(200).send({ success: true, data: file });
      })
      .catch((err) => {
        res.status(500).send({ success: false, msg: err.message });
      });
  }
  // 새로운 파일 등록
  else {
    // 사용자 입력 정보
    const fileModel = new FileModel();

    // 파일 업로드시 생성한 _id값 사용
    fileModel._id = mongoose.Types.ObjectId(file.filename.split('.')[0]);
    fileModel.fileTitle = data.fileTitle;
    fileModel.productCode = data.productCode;
    fileModel.productName = data.productName;
    fileModel.empId = data.empId;
    fileModel.empName = data.empName;
    fileModel.deptPath = data.deptPath;
    fileModel.description = data.description;

    fileModel.uploadDate = Date.now();
    fileModel.updateDate = Date.now();
    fileModel.downloadCount = 0;

    // multer 파일 정보
    fileModel.originFileName = file.originalname;
    // fileModel.fileName = file.filename;
    fileModel.fileName = fileModel._id + '.' + file.originalname.split('.')[1];
    // fileModel.filePath = file.filePath;
    fileModel.filePath = filePath + fileModel.fileName;
    fileModel.size = file.size;

    console.log('[fileModel] ', fileModel);

    fileModel
      .save()
      .then((file) => {
        res.status(200).send({ success: true, data: file });
      })
      .catch((err) => {
        res.status(500).send({ success: false, msg: err.message });
      });
  }
});

/**
 * 다운로드 파일 삭제
 */
router.delete('/remove/:_id', (req, res) => {
  FileModel.deleteOne({ _id: req.params._id })
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
