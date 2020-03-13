import { ProductModel } from './../../../models/product';
const { Router } = require('express');
const router = Router();
const Gitlab = require('gitlab').Gitlab;
const bodyParser = require('body-parser');
const createError = require('http-errors');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * 개발자문서 제품 리스트 가져오기
 */
router.get('/productList', (req, res) => {
  ProductModel.find()
    .sort({ index: 1 })
    .then((products) => {
      res.status(200).send({ success: true, data: products });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 개발자문서 제품 등록
 */
router.post('/productRegister', (req, res) => {
  const product = req.body;
  const productModel = new ProductModel(product);

  ProductModel.countDocuments()
    .then((count) => {
      productModel.index = count + 1;
      return productModel.save();
    })
    .then((product) => {
      res.status(200).send({ success: true, data: product });
    })
    .catch((err) => {
      let errMsg = '';
      if (err.code === 11000 && err.errmsg.includes('productCode')) {
        errMsg = '제품코드가 중복되었습니다.';
      } else {
        errMsg = '이미 존재하는 제품의 프로젝트 ID 입니다.';
      }
      res.status(500).send({ success: false, msg: errMsg });
    });
});

/**
 * 개발자문서 _id 로 제품 조회
 */
router.get('/getCurrentProductData', (req, res) => {
  ProductModel.findOne({
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
 * 개발자문서 제품 수정
 */
router.post('/productUpdate/:_id', (req, res) => {
  ProductModel.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    { $set: req.body },
    { new: true }
  )
    .then((product) => {
      res.status(200).send({ success: true, data: product });
    })
    .catch((err) => {
      let errMsg = '';
      if (err.code === 11000 && err.errmsg.includes('productCode')) {
        errMsg = '제품코드가 중복되었습니다.';
      } else {
        errMsg = '이미 존재하는 제품의 프로젝트 ID 입니다.';
      }
      res.status(500).send({ success: false, msg: errMsg });
    });
});

/**
 * 개발자문서 제품 목록(순서) 수정
 */
router.put('/updateProductsIndex', (req, res) => {
  const products = req.body;

  const promises = [];

  // 제품 목록 index 수정, _id 제거
  products.map((product, index) => {
    promises.push(
      ProductModel.findOneAndUpdate(
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
 * 개발자문서 제품 삭제
 */
router.delete('/productRemove/:_id', (req, res) => {
  ProductModel.deleteOne({ _id: req.params._id })
    .then((result) => {
      if (result.n === 0) {
        return res
          .status(404)
          .send({ success: false, msg: 'Product not found' });
      } else {
        ProductModel.find()
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
 * 개발자문서 제품 선택
 */
router.get('/productSelect', (req, res) => {
  const selectedProjectId = {
    projectId: req.query.selectedProjectId,
  };

  ProductModel.find(selectedProjectId)
    .then((product) => {
      if (product.length === 0) {
        throw createError(404, 'Product Not Found');
      } else {
        res.status(200).send(product);
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: err.message });
    });
});

/**
 * 개발자문서 제품 정보 MongoDB 에서 가져오기
 */
router.get('/getProjectId', (req, res) => {
  const params = {
    productCode: req.query.productCode,
  };

  ProductModel.find(params)
    .then((product) => {
      if (product.length === 0) {
        throw createError(404, 'Product Not Found');
      } else {
        res.status(200).send(product[0]);
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err, msg: err.message });
    });
});

// router.get('/getProjectIdList', (req, res) => {
//   const gitlabToken = req.query.gitlabToken;
//
//   const service = new Gitlab({
//     host: process.env.GITLAB_URL,
//     token: gitlabToken,
//   });
//
//   service.Projects.all()
//     .then((result) => {
//       res.status(200).send({ success: true, data: result });
//     })
//     .catch((err) => {
//       res
//         .status(err.response.status)
//         .send({ success: false, msg: err.message });
//     });
// });

/**
 * 개발자문서 제품의 gitlab 프로젝트 정보 가져오기
 */
router.get('/getProjectInfo', (req, res) => {
  const gitlabToken = req.query.gitlabToken;
  const projectId = req.query.projectId;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.Projects.show(projectId)
    .then((projectInfo) => {
      res.status(200).send({ success: true, data: projectInfo });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * gitlabToken 유효성 체크
 */
router.get('/checkGitlabToken', (req, res) => {
  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: process.env.GITLAB_URL,
    token: gitlabToken,
  });

  service.Users.all()
    .then((result) => {
      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res
        .status(err.response.status)
        .send({ success: false, msg: err.message });
    });
});

module.exports = router;
