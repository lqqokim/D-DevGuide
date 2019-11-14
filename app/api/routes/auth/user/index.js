import { UserModel } from './../../../models/user';

const { Router } = require('express');
const router = Router();

/**
 * loginId 로 유저정보 조회
 */
router.get('/:loginId', (req, res) => {
  UserModel.find({ loginId: req.params.loginId }, (err, user) => {
    if (err) console.error(err);
    console.log('user', user);
    res.send(user);
  });
});

/**
 * _id 로 gitlabToken 업데이트
 */
router.put('/gitlabToken/:loginId', (req, res) => {
  console.log('gitlabToken', req.params, req.body);
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

router.delete('/remove/:loginId', (req, res) => {
  const { loginId } = req.params;

  UserModel.findOneAndRemove({ loginId }).then((res) => {});
});
// // Mock Users
// const users = [{ name: '홍길동' }, { name: '정일영' }];
//
// router.get('/', function(req, res, next) {
//   res.json(users);
// });
//
// router.get('/:id', function(req, res, next) {
//   const id = parseInt(req.params.id);
//   if (id >= 0 && id < users.length) {
//     res.json(users[id]);
//   } else {
//     res.sendStatus(404);
//   }
// });

module.exports = router;
