import { VideoModel, VideoProductModel } from './../../../models/video';

const { Router } = require('express');
const router = Router();

/**
 * 동영상 프로젝트 등록
 */
router.post('/product', (req, res) => {
  const project = req.body;
  const productModel = new VideoProductModel(project);

  productModel
    .save()
    .then((project) => {
      res.status(200).send({ success: true, data: project });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 프로젝트 삭제
 */
router.delete('/remove/product/:productCode', (req, res) => {
  VideoProductModel.deleteOne({ productCode: req.params.productCode })
    .then((result) => {
      console.log('결과 ', result);
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Product not found' });
      } else {
        VideoProductModel.find()
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
 * 동영상 프로젝트 목록 조회
 */
router.get('/products', (req, res) => {
  VideoProductModel.find()
    .then((projects) => {
      res.status(200).send({ success: true, data: projects });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 제품 관리 스태프 등록
 */
router.post('/register/staffs/:productCode', (req, res) => {
  console.log('스태프 등록 :: ', req.body);

  VideoProductModel.update(
    { productCode: req.params.productCode },
    {
      $set: {
        staff: req.body,
      },
    },
    // { upsert: true, multi: true }
    { upsert: true }
  )
    .then((projects) => {
      res.status(200).send({ success: true, data: projects });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 제품 관리 스태프 삭제
 */
// router.post('/remove/staff/:productCode/:_id', (req, res) => {
//   console.log('스태프 삭제', req.params);
//
//   VideoProductModel.updateOne(
//     { productCode: req.params.productCode },
//     {
//       $pull: {
//         staff: {
//           _id: req.params._id,
//         },
//       },
//     }
//   )
//     .then((result) => {
//       res.status(200).send({ success: true, data: result });
//     })
//     .catch((err) => {
//       res.status(500).send({ success: false, msg: err.message });
//     });
// });

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
router.get('/list/product/:productCode', (req, res) => {
  VideoModel.find({ productCode: req.params.productCode })
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
  console.log('동영상을 등록 :: ', req.body);
  const data = req.body;

  const videoModel = new VideoModel();
  data.series.map((video) => {
    video.groupId = videoModel._id;
  });

  videoModel.videoTitle = data.videoTitle;
  videoModel.youtubeId = data.youtubeId;
  videoModel.productName = data.productName;
  videoModel.productCode = data.productCode;
  videoModel.uploadDate = data.uploadDate;
  videoModel.updateDate = data.updateDate;
  videoModel.playTime = data.playTime;
  videoModel.viewCount = data.viewCount;
  videoModel.empName = data.empName;
  videoModel.deptPath = data.deptPath;
  videoModel.description = data.description;
  videoModel.isSeries = data.isSeries;
  videoModel.seriesTitle = data.seriesTitle;
  videoModel.series = data.series;

  console.log('videoModel :: ', videoModel);

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
  const { productCode } = req.body;

  // video _id로 _video 삭제
  VideoModel.deleteOne({ _id })
    .then((result) => {
      if (result.n === 0) {
        return res.status(404).json({ success: false, msg: 'Video not found' });
      } else {
        // projectId 로 video 목록 조회
        VideoModel.find({ productCode })
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
