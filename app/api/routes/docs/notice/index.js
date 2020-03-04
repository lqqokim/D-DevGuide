import { NoticeModel } from './../../../models/notice';

const { Router } = require('express');
const router = Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * 공지사항 등록
 */
router.post('/noticeRegister', (req, res) => {
  const notice = req.body;
  const noticeModel = new NoticeModel(notice);

  NoticeModel.countDocuments({ productCode: req.body.productCode })
    .then((count) => {
      noticeModel.index = count + 1;
      return noticeModel.save();
    })
    .then((notice) => {
      res.status(200).send({ success: true, data: notice });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 공지사항 리스트 가져오기
 */
router.get('/getNoticeList', (req, res) => {
  const productCode = {
    productCode: req.query.productCode,
  };
  NoticeModel.find(productCode)
    .sort({ index: -1 })
    .then((notices) => {
      res.status(200).send({ success: true, data: notices });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 공지사항 리스트 수정
 */
router.put('/updateNoticeIndex', (req, res) => {
  const notices = req.body;
  const promises = [];
  const noticesLength = notices.length;

  // 공지사항 목록 index 수정
  notices.map((notice, index) => {
    promises.push(
      NoticeModel.findOneAndUpdate(
        {
          productCode: notice.productCode,
          writeTime: notice.writeTime,
        },
        { $set: { index: noticesLength - index } }
      )
    );
  });

  Promise.all(promises)
    .then((notices) => {
      res.status(200).send({ success: true, data: notices });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 공지사항 삭제
 */
router.get('/noticeDelete', (req, res) => {
  const notice = req.query;

  NoticeModel.deleteOne(notice)
    .then((noticeData) => {
      res.status(200).send({ success: true, data: noticeData });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

module.exports = router;
