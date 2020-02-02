import { NoticeModel } from './../../../models/notice';

const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// 공지사항 등록
router.post('/noticeRegister', (req, res) => {
  const noticeModel = new NoticeModel();
  noticeModel.productCode = req.body.productCode;
  noticeModel.category = req.body.category;
  noticeModel.noticeTitle = req.body.noticeTitle;
  noticeModel.noticeDescription = req.body.noticeDescription;
  noticeModel.filePath = req.body.filePath;
  noticeModel.pageTitle = req.body.pageTitle;
  noticeModel.writeTime = req.body.writeTime;
  noticeModel.writer = req.body.writer;

  noticeModel.save(function(err) {
    if (err) {
      res.json({ result: 0 });
      return;
    }

    res.json({ result: 1 });
  });
});

// 공지사항 목록
router.get('/getNoticeList', (req, res) => {
  const productCode = {
    productCode: req.query.productCode,
  };
  NoticeModel.find(productCode, function(err, result) {
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(result);
  });
});

// 공지사항 삭제
router.get('/noticeDelete', (req, res) => {
  const noticeData = {
    productCode: req.query.productCode,
    category: req.query.category,
    noticeTitle: req.query.noticeTitle,
    noticeDescription: req.query.noticeDescription,
    filePath: req.query.filePath,
    pageTitle: req.query.pageTitle,
    writeTime: req.query.writeTime,
    writer: req.query.writer,
  };
  NoticeModel.deleteOne(noticeData, function(err, result) {
    if (err) return res.status(500).send({ error: 'database failure' });
    res.json(result);
  });
});

module.exports = router;
