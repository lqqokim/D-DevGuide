const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

/**
 * 질문답변 제품 모델
 */
const staffSchema = new mongoose.Schema({
  empName: { type: String, required: true },
  positionName: { type: String, required: true },
  deptPath: { type: String, required: true },
  empId: { type: String, required: true },
});

const forumProductSchema = new mongoose.Schema({
  index: { type: Number },
  productName: { type: String, required: true },
  productCode: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  isUse: { type: Boolean },
  staffs: [staffSchema],
});

const ForumProductModel = mongoose.model('forum_product', forumProductSchema);

/**
 * 질문답변 댓글 모델
 */
const subCommentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  authority: { type: String },
  isStaff: { type: Boolean, required: true },

  regDate: { type: Number, required: true },
  editDate: { type: Number, required: true },

  contents: { type: String, required: true },
});

const commentSchema = new mongoose.Schema({
  boardName: { type: String },
  boardCode: { type: String },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'forum_post' },

  userId: { type: String, required: true },
  userName: { type: String, required: true },
  deptPath: { type: String },
  authority: { type: String },
  isStaff: { type: Boolean, required: true },

  regDate: { type: Number, required: true },
  editDate: { type: Number, required: true },

  contents: { type: String, required: true },
  isChoose: { type: Boolean, required: true },
  comments: [subCommentSchema],
});

const ForumCommentModel = mongoose.model('forum_comment', commentSchema);

/**
 * 질문답변 게시판 모델
 */
const boardSchema = new mongoose.Schema({
  index: { type: Number },
  boardName: { type: String },
  boardCode: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'forum_post' }],
  regDate: { type: Number },
  editDate: { type: Number },
});

// boardSchema.plugin(autoIncrement.plugin, {
//   model: 'boardSchema',
//   field: 'index',
//   startAt: 0,
//   increment: 1,
// });

const ForumBoardModel = mongoose.model('forum_board', boardSchema);

/**
 * 질문답변 질문답변 글 모델
 */
const fileSchema = new mongoose.Schema({
  originFileName: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  contents: { type: String, required: true },
  boardName: { type: String },
  boardCode: { type: String },
  regDate: { type: Number, required: true },
  editDate: { type: Number, required: true },

  userId: { type: String, required: true },
  userName: { type: String, required: true },
  deptPath: { type: String },
  authority: { type: String, required: true },

  viewCount: { type: Number, required: true },
  commentCount: { type: Number, required: true },
  like: { type: Number, required: true },
  likeUsers: [{ type: String }],
  dislikeUsers: [{ type: String }],
  isComplete: { type: Boolean, required: true },

  subComments: [commentSchema],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'forum_comment' }],
  files: [fileSchema],
});

const ForumPostModel = mongoose.model('forum_post', postSchema);

module.exports = {
  ForumProductModel,
  ForumBoardModel,
  ForumPostModel,
  ForumCommentModel,
};
