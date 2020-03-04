import { UserModel } from './../../../models/user';
const ereateError = require('http-errors');

const { Router } = require('express');
const router = Router();

/**
 * loginId 로 유저정보 조회
 */
router.get('/:loginId', (req, res) => {
  UserModel.find({ loginId: req.params.loginId }, (err, user) => {
    if (err) {
      res.status(500).send({ success: false, msg: err.message });
      return;
    }
    // console.log('mongodb user :: ', user);
    if (user.length) {
      res.status(200).send({ success: true, data: user });
    } else {
      res
        .status(404)
        .send({ msg: 'MongoDB 에 해당 유저가 존재하지 않습니다.' });
    }
  });
});

/**
 * _id 로 gitlabToken 업데이트
 */
router.put('/gitlabToken/:loginId', (req, res) => {
  // console.log('gitlabToken', req.params, req.body);
  const { loginId } = req.params;
  const { gitlabToken } = req.body;

  UserModel.findOneAndUpdate(
    { loginId },
    { $set: { gitlabToken } },
    { new: true }
  )
    .then((user) => {
      res.status(200).send({ success: true, data: user });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

module.exports = router;
