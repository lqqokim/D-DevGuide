import { VideoModel } from './../../../models/video';

const { Router } = require('express');
const router = Router();

/**
 * 동영상 조회
 */
router.get('/:_id', (req, res) => {
  VideoModel.findOne({ _id: req.params._id })
    .then((video) => {
      res.status(200).send({ success: true, data: video });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 모든 동영상 목록을 조회
 */
router.get('/list/product/:projectId', (req, res) => {
  VideoModel.find({ projectId: req.params.projectId })
    .then((videos) => {
      res.status(200).send({ success: true, data: videos });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

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
router.post('/remove/:_id', (req, res) => {
  const { _id } = req.params;
  const { projectId } = req.body;

  // video _id로 _video 삭제
  VideoModel.deleteOne({ _id })
    .then((result) => {
      if (result.n === 0) {
        return res.status(404).json({ success: false, msg: 'Video not found' });
      } else {
        // projectId 로 video 목록 조회
        VideoModel.find({ projectId })
          .then((videos) => {
            res.status(200).send({ success: true, data: videos });
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

// {
//   n: 1,
//   ok: 1,
//   deletedCount: 1
// }

// var itemId = 123;
// Item.findOneAndRemove({ id: itemId })
//   .exec(function(err, item) {
//     if (err) {
//       return res.json({success: false, msg: 'Cannot remove item'});
//     }
//     if (!item) {
//       return res.status(404).json({success: false, msg: 'User not found'});
//     }
//     res.json({success: true, msg: 'User deleted.'});
//   });

// Project.findOneAndUpdate(
//   { _id: projectId },
//   { $pull: { enrichedEvents: enrichedEventId } }
// )
//   .then((project) => {
//     if (project) {
//       EnrichedEvent.remove({ _id: enrichedEventId }).then((result) => {
//         if (result.n === 0) {
//           return res.status(404).json({ message: 'ID not found' });
//         } else {
//           return res.status(200).json({ message: 'event removed' });
//         }
//       });
//     } else {
//       return res.status(400).json({ message: 'projectId is invalid' });
//     }
//   })
//   .catch((err) => {
//     return res.status(500).json({ error: err });
//   });

// router.delete('/remove/');

module.exports = router;
