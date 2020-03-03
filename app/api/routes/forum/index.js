import {
  ForumBoardModel,
  ForumCommentModel,
  ForumPostModel,
  ForumProductModel,
} from './../../../api/models/forum';
import { DocProductModel } from '~/api/models/document';
import { VideoProductModel } from '~/api/models/video';
const mongoose = require('mongoose');
const { Router } = require('express');
const router = Router();

router.post('/condition', (req, res) => {
  const { userId } = req.body;

  const result = {
    myActivity: {
      complete: 0,
      inProgress: 0,
      commentCount: 0,
    },
    allActivity: {
      all: 0,
      inProgress: 0,
      complete: 0,
    },
  };

  ForumPostModel.find({})
    .then((posts) => {
      result.allActivity.all = posts.length;
      result.allActivity.complete = posts.filter((post) => {
        return post.isComplete === true;
      }).length;
      result.allActivity.inProgress =
        posts.length - result.allActivity.complete;

      return ForumPostModel.find({ userId });
    })
    .then((posts) => {
      result.myActivity.complete = posts.filter((post) => {
        return post.isComplete === true;
      }).length;
      result.myActivity.inProgress = posts.length - result.myActivity.complete;

      return ForumCommentModel.find({ userId });
    })
    .then((comments) => {
      result.myActivity.commentCount = comments.length;

      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 내 질문/답변 조회
 */
router.post('/list/my', (req, res) => {
  const { params, type, userId } = req.body;
  const { sort, skip, limit, filterType } = params.params;

  // console.log('[Posts 조회 요청]');
  // console.log('sort :: ', sort, typeof sort);
  // console.log('skip :: ', skip);
  // console.log('limit :: ', limit);
  // console.log('filterType :: ', filterType);

  let total = 0;
  let filter;
  let result;

  if (type === 'write') {
    filter = {
      userId,
    };

    if (filterType !== 'All') {
      filter.isComplete = filterType === 'Complete';
    }

    const forumPostModel = ForumPostModel.find(filter).populate('comments');
    let completeCount = 0;
    let progressCount = 0;
    forumPostModel.then((posts) => {
      total = posts.length;

      posts.map((post) => {
        if (post.isComplete) {
          completeCount++;
        } else if (!post.isComplete) {
          progressCount++;
        }
      });

      forumPostModel
        .sort(sort)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .then((posts) => {
          result = posts; // 페이지 퍼리에 대한 결과

          return {
            isSet: true,
            totalCount: completeCount + progressCount,
            completeCount,
            progressCount,
          };
        })
        .then((count) => {
          res.status(200).send({
            success: true,
            data: {
              total,
              result,
              count,
            },
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            msg: err.message,
          });
        });
    });
  } else {
    const filter = {};
    let postsForCount;
    let forumPostModel;

    ForumCommentModel.find({
      userId,
    })
      .then((comments) => {
        return comments.map((comment) => {
          return comment.postId.toString();
        });
      })
      .then((postIds) => {
        return postIds.filter((item, index) => postIds.indexOf(item) === index);
      })
      .then((postIds) => {
        return postIds.map((postId) => {
          return mongoose.Types.ObjectId(postId);
        });
      })
      .then((postIds) => {
        const filter = {
          _id: {
            $in: postIds,
          },
        };

        if (filterType !== 'All') {
          filter.isComplete = filterType === 'Complete';
        }

        forumPostModel = ForumPostModel.find(filter).populate('comments');

        forumPostModel
          .then((posts) => {
            total = posts.length;

            forumPostModel
              .sort(sort)
              .skip(parseInt(skip))
              .limit(parseInt(limit))
              .then((posts) => {
                result = posts; // 페이지 퍼리에 대한 결과
                let completeCount = 0;
                let progressCount = 0;

                posts.map((post) => {
                  if (post.isComplete) {
                    completeCount++;
                  } else if (!post.isComplete) {
                    progressCount++;
                  }
                });

                return {
                  isSet: true,
                  totalCount: completeCount + progressCount,
                  completeCount,
                  progressCount,
                };
              })
              .then((count) => {
                res.status(200).send({
                  success: true,
                  data: {
                    total,
                    result,
                    count,
                  },
                });
              })
              .catch((err) => {
                res.status(500).send({
                  success: false,
                  msg: err.message,
                });
              });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              msg: err.message,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          msg: err.message,
        });
      });
  }
});

/**
 * 질문답변 제품 목록 수정
 */
router.put('/products', (req, res) => {
  const products = req.body;

  const productPromises = [];
  const boardPromises = [];

  // 제품 목록 index 수정, _id 제거
  products.map((product, index) => {
    productPromises.push(
      ForumProductModel.findOneAndUpdate(
        {
          productCode: product.productCode,
        },
        { $set: { index: index + 1 } }
      )
    );

    boardPromises.push(
      ForumBoardModel.findOneAndUpdate(
        {
          boardCode: product.productCode,
        },
        { $set: { index: index + 1 } }
      )
    );
  });

  Promise.all(boardPromises).then((products) => {});
  Promise.all(productPromises)
    .then((products) => {
      res.status(200).send({ success: true, data: products });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문다변 제품 수정
 */
router.post('/product/update/:_id', (req, res) => {
  const date = Date.now();

  ForumProductModel.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
    {
      new: true,
    }
  )
    .then((product) => {
      ForumBoardModel.findOneAndUpdate(
        {
          boardCode: product.productCode,
        },
        {
          boardName: product.productName,
          boardCode: product.productCode,
          editDate: date,
        },
        { returnOriginal: false, upsert: true }
      )
        .then((result) => {
          res.status(200).send({ success: true, data: result });
        })
        .catch((err) => {
          res.status(500).send({ success: false, msg: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문답변 제품 등록
 */
router.post('/product', (req, res) => {
  const product = req.body;
  const productModel = new ForumProductModel(product);
  const date = Date.now();
  let resultProduct;

  ForumProductModel.countDocuments()
    .then((count) => {
      productModel.index = count + 1;
      return productModel.save();
    })
    .then((product) => {
      resultProduct = product;
      const boardModel = new ForumBoardModel({
        boardName: product.productName,
        boardCode: product.productCode,
        posts: [],
        regDate: date,
        editDate: date,
        index: product.index,
      });

      return boardModel.save();
    })
    .then((result) => {
      res.status(200).send({ success: true, data: resultProduct });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문답변 제품 삭제
 */
router.delete('/remove/product/:productCode', (req, res) => {
  ForumProductModel.deleteOne({ productCode: req.params.productCode })
    .then((result) => {
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Product not found' });
      } else {
        ForumBoardModel.deleteOne({ boardCode: req.params.productCode })
          .then((result) => {
            res.status(200).send({ success: true, data: result });
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
 * 질문답변 제품 삭제
 */
router.delete('/remove/product/:productCode', (req, res) => {
  ForumProductModel.deleteOne({ productCode: req.params.productCode })
    .then((result) => {
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Product not found' });
      } else {
        ForumProductModel.deleteOne({ boardCode: req.params.productCode })
          .then((result) => {
            res.status(200).send({ success: true, data: result });
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
 * 질문 답변 등록
 */
router.post('/register/post/:_id/comment', (req, res) => {
  const { _id } = req.params;
  const data = req.body;
  const date = Date.now();

  data.regDate = date;
  data.editDate = date;

  const forumCommentModel = new ForumCommentModel(data);

  forumCommentModel
    .save()
    .then((comment) => {
      ForumPostModel.updateOne(
        { _id },
        {
          $push: {
            comments: comment._id,
          },
        }
      ).then((result) => {
        // n: 1,
        // nModified: 1,
        // ok: 1
        if (result.ok) {
        }
      });

      res.status(200).send({ success: true, data: comment });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문 추천 업데이트
 */
router.post('/like/:_id', (req, res) => {
  const { type, userId, post } = req.body;
  const { _id } = req.params;
  const value = type === 'plus' ? 1 : -1;
  const target =
    type === 'plus' ? { likeUsers: userId } : { dislikeUsers: userId };

  // console.log('type :: ', type);
  // console.log('value :: ', value);
  // console.log('target :: ', target);

  if (type === 'plus') {
    // 추천을 누른 사용자가 비추천을 누른적이 있는 경우
    if (post.dislikeUsers.includes(userId)) {
      // 비추천 목록에서 제거
      ForumPostModel.findOneAndUpdate(
        { _id },
        {
          $pull: {
            dislikeUsers: userId,
          },
        },
        { new: true }
      ).then(() => {
        ForumPostModel.findOneAndUpdate(
          { _id },
          { $inc: { like: value } },
          { new: true }
        )
          .populate('comments')
          .then((result) => {
            res.status(200).send({
              success: true,
              data: result,
            });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              msg: err.message,
            });
          });
      });
    } else {
      ForumPostModel.findOneAndUpdate(
        { _id },
        {
          $inc: { like: value },
          $push: target,
        },
        { new: true }
      )
        .populate('comments')
        .then((result) => {
          res.status(200).send({
            success: true,
            data: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            msg: err.message,
          });
        });
    }
  }
  // 비추천을 누른 사용자가 추천을 누른적이 있는경우
  else if (type === 'minus') {
    if (post.likeUsers.includes(userId)) {
      ForumPostModel.findOneAndUpdate(
        { _id },
        {
          $pull: {
            likeUsers: userId,
          },
        },
        { new: true }
      ).then(() => {
        ForumPostModel.findOneAndUpdate(
          { _id },
          { $inc: { like: value } },
          { new: true }
        )
          .populate('comments')
          .then((result) => {
            res.status(200).send({
              success: true,
              data: result,
            });
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              msg: err.message,
            });
          });
      });
    } else {
      ForumPostModel.findOneAndUpdate(
        { _id },
        {
          $inc: { like: value },
          $push: target,
        },
        { new: true }
      )
        .populate('comments')
        .then((result) => {
          res.status(200).send({
            success: true,
            data: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            msg: err.message,
          });
        });
    }
  }
  // 비추천을 누른 사용자가 추천을 누른적이 있는 경우
});

/**
 * 잘문 조회수 증가
 */
router.post('/count/:_id', (req, res) => {
  ForumPostModel.findOneAndUpdate(
    { _id: req.params._id },
    { $inc: { viewCount: 1 } }
  )
    .then((result) => {
      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품에 대한 질문 상제 조회
 */
router.get('/post/:_id', (req, res) => {
  ForumPostModel.findOne({ _id: req.params._id })
    .populate('comments')
    .then((post) => {
      res.status(200).send({ success: true, data: post });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품에 대한 질문답변 질문 목록 조회
 */
router.get('/list/:productCode', (req, res) => {
  const { productCode } = req.params;
  const { sort, skip, limit, isNotExistComments, filterType } = req.query;

  // console.log('[Posts 조회 요청]');
  // console.log('productCode :: ', productCode);
  // console.log('sort :: ', sort);
  // console.log('skip :: ', skip);
  // console.log('limit :: ', limit);
  // console.log('isNotExistComments :: ', isNotExistComments);
  // console.log('filterType :: ', filterType);

  if (!(sort && skip && limit && isNotExistComments && filterType)) {
    return res.send({
      success: false,
      msg: '잘못된 요청입니다.',
    });
  }

  let total = 0;

  if (productCode === 'ALL') {
    const findOptions = {};

    if (filterType !== 'All') {
      findOptions.isComplete = filterType === 'Complete';
    }

    // 답변이 없는 항목만 보기
    if (isNotExistComments === 'true') {
      findOptions.comments = {
        $size: 0,
      };
    }

    const forumPostModel = ForumPostModel.find(findOptions).populate(
      'comments'
    );

    forumPostModel.then((posts) => {
      total = posts.length;

      forumPostModel
        .find(findOptions)
        .sort(sort)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .then((posts) => {
          res.status(200).send({
            success: true,
            data: {
              total,
              result: posts,
            },
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            msg: err.message,
          });
        });
    });
  } else {
    const findOptions = {
      boardCode: productCode,
    };
    if (filterType !== 'All') {
      findOptions.isComplete = filterType === 'Complete';
    }

    // 답변이 없는 항목만 보기
    if (isNotExistComments === 'true') {
      findOptions.comments = {
        $size: 0,
      };
    }

    const forumPostModel = ForumPostModel.find(findOptions).populate(
      'comments'
    );

    forumPostModel.then((posts) => {
      total = posts.length;

      forumPostModel
        .sort(sort)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .then((posts) => {
          res.status(200).send({
            success: true,
            data: {
              total,
              result: posts,
            },
          });
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            msg: err.message,
          });
        });
    });
  }
});

/**
 * 질문답변 제품 목록 조회
 */
router.get('/products', (req, res) => {
  ForumProductModel.find()
    .sort({ index: 1 })
    .then((products) => {
      res.status(200).send({ success: true, data: products });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문답변 제품 조회
 */
router.get('/product/:productCode', (req, res) => {
  ForumProductModel.findOne({ productCode: req.params.productCode })
    .then((product) => {
      res.status(200).send({ success: true, data: product });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 통합검색 질문답변 검색결과 조회
 */
router.get('/searchPosts', (req, res) => {
  const { searchWord } = req.query;
  let searchResult = [];

  ForumPostModel.find({
    title: { $regex: searchWord },
  })
    .populate('comments')
    .then((titleSearchResult) => {
      searchResult = titleSearchResult;
      return ForumPostModel.find({
        contents: { $regex: searchWord },
      }).populate('comments');
    })
    .then((contentsSearchResult) => {
      searchResult = searchResult.concat(contentsSearchResult);
      res.status(200).send({
        success: true,
        data: {
          result: searchResult,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 제품코드별 질문 검색결과 조회
 */
router.get('/searchPosts/:boardCode', (req, res) => {
  const { boardCode } = req.params;
  const {
    searchWord,
    sort,
    skip,
    limit,
    isNotExistComments,
    filterType,
  } = req.query;

  const findOptions = {
    $or: [
      {
        title: {
          $regex: searchWord,
        },
      },
      {
        contents: {
          $regex: searchWord,
        },
      },
    ],
  };

  if (boardCode !== 'ALL') {
    findOptions.boardCode = boardCode;
  }

  if (filterType !== 'All') {
    findOptions.isComplete = filterType === 'Complete';
  }

  // 답변이 없는 항목만 보기
  if (isNotExistComments === 'true') {
    findOptions.comments = {
      $size: 0,
    };
  }

  console.log('findOptions :: ', findOptions);

  let total = 0;
  const forumPostModel = ForumPostModel.find(findOptions).populate('comments');

  forumPostModel
    .then((posts) => {
      total = posts.length;

      return forumPostModel
        .sort(sort)
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .then((posts) => {
          res.status(200).send({
            success: true,
            data: {
              total,
              result: posts,
            },
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        msg: err.message,
      });
    });
});

/**
 * 질문답변 질문 등록
 */
router.post('/register/post/:boardCode', (req, res) => {
  const { boardCode } = req.params;
  const data = req.body;
  const date = Date.now();

  data.regDate = date;
  data.editDate = date;

  const forumPostModel = new ForumPostModel(data);

  forumPostModel
    .save()
    .then((post) => {
      ForumBoardModel.updateOne(
        { boardCode },
        {
          $push: {
            posts: post._id,
          },
        }
      ).then((result) => {
        // n: 1,
        // nModified: 1,
        // ok: 1
        if (result.ok) {
        }
      });

      res.status(200).send({ success: true, data: post });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });

  // Insurance.update({_id:id, 'plan._id':id2}, {$push :
  //     {'plan.$.rate_card' : req.body}
  // }, {upsert: true}, function(err, docs){
  //   res.json(docs);
  //   console.log(docs);
  // });

  // forumPostModel.title =
});

/**
 * 질문 서브 댓글 삭제
 */
router.delete('/post/:postId/subComment/:subCommentId', (req, res) => {
  const { postId, subCommentId } = req.params;
  ForumPostModel.findByIdAndUpdate(
    { _id: postId },
    {
      $pull: {
        subComments: {
          _id: subCommentId,
        },
      },
    }
  )
    .then((result) => {
      res.status(200).send({ success: true, data: result });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문 서브 댓글 등록
 */
router.post('/register/:postId/subComment', (req, res) => {
  const subComment = req.body;
  const date = Date.now();

  subComment.regDate = date;
  subComment.editDate = date;

  ForumPostModel.findByIdAndUpdate(
    { _id: req.params.postId },
    {
      $push: {
        subComments: subComment,
      },
    },
    { new: true }
  )
    .then((post) => {
      res.status(200).send({ success: true, data: post });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문 댓글 수정
 */
router.put('/update/comment/:_id', (req, res) => {
  ForumCommentModel.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $set: req.body,
    },
    {
      new: true,
    }
  )
    .then((comment) => {
      res.status(200).send({ success: true, data: comment });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문 댓글의 댓글 수정
 */
router.put('/update/subComment/:_id', (req, res) => {
  const date = Date.now();
  const subComment = req.body;
  subComment.regDate = date;
  subComment.editDate = date;

  ForumCommentModel.findOneAndUpdate(
    {
      _id: req.params._id,
    },
    {
      $push: {
        comments: subComment,
      },
    },
    {
      new: true,
    }
  )
    .then((comment) => {
      res.status(200).send({ success: true, data: comment });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문 서브 댓글 삭제
 */
router.delete('/comment/:commentId/:subCommentId', (req, res) => {
  const { commentId, subCommentId } = req.params;
  ForumCommentModel.findOneAndUpdate(
    { _id: commentId },
    {
      $pull: {
        comments: {
          _id: subCommentId,
        },
      },
    },
    {
      new: true,
    }
  )
    .then((comment) => {
      res.status(200).send({ success: true, data: comment });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 질문 수정
 */
router.post('/update/post/:_id', (req, res) => {
  const data = req.body; // payload.data (사용자 입력 값)

  ForumPostModel.findOneAndUpdate(
    { _id: req.params._id },
    { $set: data },
    {
      new: true,
    }
  )
    .populate('comments')
    .then((post) => {
      res.status(200).send({ success: true, data: post });
    })
    .catch((err) => {
      res.status(500).send({ success: false, msg: err.message });
    });
});

/**
 * 댓글 삭제
 */
router.delete('/post/:postId/comment/:commentId', (req, res) => {
  const { postId, commentId } = req.params;

  ForumCommentModel.deleteOne({ _id: commentId })
    .then((result) => {
      if (result.n === 0) {
        return res
          .status(404)
          .json({ success: false, msg: 'Comment not found' });
      } else {
        ForumPostModel.updateOne(
          { _id: postId },
          {
            $pull: {
              comments: commentId,
            },
          }
        )
          .then((result) => {
            res.status(200).send({ success: true, data: result });
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
 * 질문 삭제
 */
router.delete('/:boardCode/:_id', (req, res) => {
  const { boardCode, _id } = req.params;

  ForumPostModel.deleteOne({ _id })
    .then((result) => {
      if (result.n === 0) {
        return res.status(404).json({ success: false, msg: 'Post not found' });
      } else {
        ForumBoardModel.updateOne(
          { boardCode },
          {
            $pull: {
              comments: _id,
            },
          }
        )
          .then((result) => {
            res.status(200).send({ success: true, data: result });
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

module.exports = router;
