import { ProductModel } from './../../../models/product';
const { Router } = require('express');
const router = Router();
const Gitlab = require('gitlab').Gitlab;
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// const services = new Gitlab({
//   host: 'http://10.36.13.89',
//   token: '__5uUEPux-qreBuxsJt2',
// });

router.get('/productList', (req, res) => {
  ProductModel.find(function(err, result) {
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(result);
  });
});

// 제품 등록
router.post('/productRegister', (req, res) => {
  const product = req.body;
  product.projectId = Number(product.projectId);
  const productModel = new ProductModel(product);

  productModel
    .save()
    .then((product) => {
      res.status(200).send({ success: true, data: product });
    })
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ success: false, msg: err.message });
    });
});

// 제품 수정
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
      console.log(err.message);
      res.status(500).send({ success: false, msg: err.message });
    });
});

// 제품 삭제
router.delete('/productRemove/:_id', (req, res) => {
  ProductModel.deleteOne({ _id: req.params._id })
    .then((result) => {
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Product not found' });
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

// 제품 조회
router.get('/productSelect', (req, res) => {
  const selectedProjectId = {
    projectId: parseInt(req.query.selectedProjectId),
  };

  ProductModel.find(selectedProjectId, (err, product) => {
    if (err) console.error(err);
    res.json(product);
  });
});

// 제품의 gitlab projectId 값 가져오기
router.get('/getProjectId', (req, res) => {
  const params = {
    productCode: req.query.productCode,
  };

  ProductModel.find(params, (err, product) => {
    if (err) console.error(err);
    res.json(product[0]);
  });
});

// gitlab 에 있는 projectId 리스트 가져오기
router.get('/getProjectIdList', (req, res) => {
  const gitlabToken = req.query.gitlabToken;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
    token: gitlabToken,
  });

  service.Projects.all()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(err.response.status).send({ error: err.description });
    });
});

router.get('/getProjectInfo', (req, res) => {
  const gitlabToken = req.query.gitlabToken;
  const projectId = req.query.projectId;

  const service = new Gitlab({
    host: 'http://10.110.15.133',
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

module.exports = router;
