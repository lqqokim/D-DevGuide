// import { upload } from './../controllers/upload';
import { ProductModel } from './../models/product';

const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/productList', (req, res) => {
  ProductModel.find(function(err, result) {
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(result);
  });
});

// 제품 등록
router.post('/productRegister', (req, res) => {
  const productModel = new ProductModel();
  productModel.productType = req.body.productType;
  productModel.productName = req.body.productName;
  productModel.productDescription = req.body.productDescription;
  productModel.projectId = req.body.projectId;
  productModel.targetBranch = req.body.targetBranch;
  productModel.manualDocPath = req.body.manualDocPath;
  productModel.APIDocPath = req.body.APIDocPath;
  productModel.attachmentFilePath = req.body.attachmentFilePath;

  productModel.save(function(err) {
    if (err) {
      res.json({ result: 0 });
      return;
    }

    res.json({ result: 1 });
  });
});

module.exports = router;
