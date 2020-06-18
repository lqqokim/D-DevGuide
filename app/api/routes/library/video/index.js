import { VideoModel, VideoProductModel } from './../../../models/video';
import { ForumPostModel } from '~/api/models/forum';
const request = require('request-promise-native');

const { Router } = require('express');
const router = Router();

/**
 * 제품에 대한 모든 동영상 목록 조회
 */
router.get('/all/:productCode', (req, res) => {
  VideoModel.find({ productCode: req.params.productCode })
    .sort('-uploadDate')
    .then((videos) => {
      res.status(200).send({ success: true, data: videos });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 목록 조회
 */
router.get('/searchVideos', (req, res) => {
  VideoModel.find({
    videoTitle: { $regex: req.query.searchWord },
    // videoTitle: { $regex: req.query.searchWord, $options: 'i' }, // 대소문자 구분 없이 데이터 검색
  })
    .then((videos) => {
      res.status(200).send({ success: true, data: videos });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 조회수 업데이트
 */
router.post('/count/:_id', (req, res) => {
  // const video
  VideoModel.findOneAndUpdate(
    { _id: req.params._id },
    { $inc: { viewCount: 1 } }
  )
    .then((result) => {
      // console.log('조회수 업데이트', result);

      // VideoModel.findOneAndUpdate(
      //   {
      //     'series._id': req.params._id,
      //   },
      //   { $inc: { viewCount: 1 } }
      // )

      if (!result) {
        VideoModel.findOneAndUpdate(
          {
            'series._id': req.params._id,
          },
          { $inc: { 'series.$.viewCount': 1 } }
        )
          .then((response) => {
            // console.log('조회수 업데이트(Sub) ', response);

            res.status(200).send({ success: true, data: response });
          })
          .catch((err) => {
            res.status(500).send({ success: false, msg: err.message });
          });

        // Threads.findOneAndUpdate(
        //   { 'posts._id': req.body.postId },
        //
        //   { 'posts._id': req.body.postId },
        //   { $inc: { 'posts.$.likes.count': 1 } }
        // )
        //   .exec()
        //   .then((post) => {
        //     // some other stuff
        //   });
      } else {
        res.status(200).send({ success: true, data: result });
      }
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 제품 등록
 */
router.post('/product', (req, res) => {
  const project = req.body;
  const productModel = new VideoProductModel(project);

  VideoProductModel.countDocuments()
    .then((count) => {
      productModel.index = count + 1;
      return productModel.save();
    })
    .then((project) => {
      res.status(200).send({ success: true, data: project });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

// router.post('/updateNotice', (req, res) => {
//   const { prevProductCode, changingProductCode } = req.body;
//
//   NoticeModel.updateMany(
//     { productCode: prevProductCode },
//     { productCode: changingProductCode }
//   )
//     .then(() => {
//       res.status(200).send({ success: true });
//     })
//     .catch((err) => {
//       res.status(500).send({ success: false, msg: err.message });
//     });
// });

/**
 * 동영상 제품 업데이트
 */
router.post('/product/update/:_id', (req, res) => {
  // let originProduct = {};
  let originProduct;

  // _id로 수정항 제품 조회
  VideoProductModel.findOne({ _id: req.params._id })
    .then((product) => {
      originProduct = product;

      // 제품 정보 수정
      return VideoProductModel.findOneAndUpdate(
        { _id: req.params._id },
        { $set: req.body },
        {
          new: true,
        }
      );
    })
    .then((newProduct) => {
      // 제품 코드가 변경됐을 경우, 해당 제품내 모든 동영상의 제품코드 변경
      if (originProduct.productCode !== newProduct.productCode) {
        VideoModel.updateMany(
          { productCode: originProduct.productCode },
          { productCode: newProduct.productCode },
          {
            new: true,
          }
        ).then((videos) => {
          // console.log('1. 동영상 :: ', videos);
        });
      }

      // 제품명이 변경됐을 경우, 해당 제품내 모든 동영상의 제품명 변경
      // eslint-disable-next-line no-self-compare
      if (originProduct.productName !== newProduct.productName) {
        VideoModel.updateMany(
          { productName: originProduct.productName },
          { productName: newProduct.productName },
          {
            new: true,
          }
        ).then((videos) => {
          // console.log('2. 동영상 :: ', videos);
        });
      }

      res.status(200).send({ success: true, data: newProduct });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});
/**
 * 동영상 제품 조회
 */
router.get('/product/:productCode', (req, res) => {
  VideoProductModel.findOne({ productCode: req.params.productCode })
    .then((product) => {
      res.status(200).send({ success: true, data: product });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 제품 삭제
 */
router.delete('/remove/product/:_id', (req, res) => {
  VideoProductModel.deleteOne({ _id: req.params._id })
    .then((result) => {
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
 * 동영상 제품 목록 조회
 */
router.get('/products', (req, res) => {
  VideoProductModel.find()
    .populate('managedVideos')
    .sort({ index: 1 }) // 오름차순 정렬
    .then((products) => {
      res.status(200).send({ success: true, data: products });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 제품 목록 수정
 */
router.put('/products', (req, res) => {
  const products = req.body;

  const promises = [];

  // 제품 목록 index 수정, _id 제거
  products.map((product, index) => {
    promises.push(
      VideoProductModel.findOneAndUpdate(
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
 * 동영상 제품 관리 스태프 등록
 */
router.post('/register/staffs/:productCode', (req, res) => {
  VideoProductModel.update(
    { productCode: req.params.productCode },
    {
      $set: {
        staffs: req.body,
      },
    },
    // { upsert: true, multi: true }
    { upsert: true }
  )
    .then((products) => {
      res.status(200).send({ success: true, data: products });
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
    .then((result) => {
      // 시리즈 영상에 대한 _id일 경우 시리즈 find
      if (!result) {
        VideoModel.findOne({
          'series._id': req.params._id,
        })
          .then((video) => {
            res.status(200).send({ success: true, data: video });
          })
          .catch((err) => {
            res.status(500).send({ success: false, msg: err.message });
          });
      } else {
        res.status(200).send({ success: true, data: result });
      }
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품에 대한 동영상 목록을 조회
 */
router.get('/list/:productCode', (req, res) => {
  const { productCode } = req.params;
  const { sort, skip, limit } = req.query;

  if (!(sort && skip && limit)) {
    return res.send({ success: false, msg: '잘못된 요청입니다.' });
  }

  let total = 0;

  VideoModel.countDocuments({ productCode })
    .then((count) => {
      total = count;

      return VideoModel.find({ productCode })
        .sort(sort)
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    })
    .then((result) => {
      res.status(200).send({ success: true, data: { total, result } });
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
  const data = req.body;
  const uploadDate = Date.now();
  const videoModel = new VideoModel();

  data.isSeries &&
    data.series.length &&
    data.series.map((video) => {
      video.groupId = videoModel._id;
      video.productName = data.productName;
      video.productCode = data.productCode;
      video.uploadDate = uploadDate;
      video.updateDate = uploadDate;
      video.viewCount = data.viewCount;
      video.empId = data.empId;
      video.empName = data.empName;
      video.deptPath = data.deptPath;
      video.isSeries = data.isSeries;
      video.seriesTitle = data.seriesTitle;
      video.description = data.description;
    });

  videoModel.videoTitle = data.videoTitle;
  videoModel.youtubeId = data.youtubeId;
  videoModel.productName = data.productName;
  videoModel.productCode = data.productCode;
  videoModel.uploadDate = uploadDate;
  videoModel.updateDate = uploadDate;
  videoModel.viewCount = data.viewCount;
  videoModel.empId = data.empId;
  videoModel.empName = data.empName;
  videoModel.deptPath = data.deptPath;
  videoModel.description = data.description;
  videoModel.isSeries = data.isSeries;
  videoModel.seriesTitle = data.seriesTitle;
  videoModel.series = data.series;
  videoModel.playTime = data.playTime;

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
 * 동영상 업데이트
 */
router.post('/update/:_id', (req, res) => {
  const video = req.body;
  const updateDate = Date.now();
  video.updateDate = updateDate;
  // console.log('동영상 업데이트 :: ', req.body);

  // parent 의 값을 추가
  video.isSeries &&
    video.series.map((item) => {
      if (!item.groupId) {
        item.isSeries = true;
        item.groupId = video._id;
        item.productName = video.productName;
        item.productCode = video.productCode;
        item.uploadDate = updateDate;
        item.updateDate = updateDate;
        item.viewCount = 0;
        item.empId = video.empId;
        item.empName = video.empName;
        item.deptPath = video.deptPath;
        item.seriesTitle = video.videoTitle;
      }
    });

  VideoModel.findOneAndUpdate(
    { _id: req.params._id },
    { $set: video },
    {
      new: true,
    }
  )
    .then((video) => {
      res.status(200).send({ success: true, data: video });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 동영상 삭제
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
        VideoProductModel.findOneAndUpdate(
          { productCode },
          {
            $pull: {
              managedVideos: {
                _id,
              },
            },
          }
        )
          .then(() => {
            // projectId 로 video 목록 조회
            return VideoModel.find({ productCode });
          })
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

/**
 * @return {string}
 */
function YTDurationToSeconds(duration) {
  let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  match = match.slice(1).map(function(x) {
    if (x != null) {
      return x.replace(/\D/, '');
    }
  });

  const hours = parseInt(match[0]) || 0;
  const minutes = parseInt(match[1]) || 0;
  const seconds = parseInt(match[2]) || 0;

  // console.log(hours, minutes, seconds);
  let result = '';
  if (hours) {
    result = result + hours.toString() + ':';
  }

  if (minutes) {
    result = result + minutes.toString() + ':';
  }

  if (seconds) {
    result = result + seconds.toString();
  }

  // return hours * 3600 + minutes * 60 + seconds;
  return result;
}

/**
 * 동영상 홈 화면 관리 데이터 업데이트
 */
router.post('/updateManagedVideo/:_id', (req, res) => {
  const videos = req.body;

  // videos.map((video, index) => {
  //   video.index = index + 1;
  // });

  VideoProductModel.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: {
        managedVideos: videos,
      },
    },
    {
      new: true,
    }
  )
    .then((product) => {
      // 결과 product 의 managedVideo 는 _id로 이루어진 Array
      res.status(200).send({
        success: true,
        data: product,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        msg: err.message,
      });
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
