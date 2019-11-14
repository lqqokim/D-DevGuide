import { VideoModel } from './../../../models/video';

const { Router } = require('express');
const router = Router();

/**
 * 모든 동영상 목록을 조회
 */
router.get('/list/:productType', (req, res) => {
  VideoModel.find({ productType: req.params.productType })
    .then((videos) => {
      res.status(200).send({ success: true, data: videos });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

// router.get('/:loginId', (req, res) => {
//   UserModel.find({ loginId: req.params.loginId }, (err, user) => {
//     if (err) console.error(err);
//     console.log('user', user);
//     res.send(user);
//   });
// });

/**
 * 동영상 목록을 업데이트 한다.
 */
router.put('/list', (req, res) => {});

/**
 * 동영상을 등록한다.
 */
router.post('/register', (req, res) => {
  const videoModel = new VideoModel(req.body);

  videoModel
    .save()
    .then((videos) => {
      res.status(200).send({ success: true, data: videos });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상을 삭제한다.
 */
router.delete('/remove/:_id', (req, res) => {});

module.exports = router;
