const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const staffSchema = new mongoose.Schema({
  empName: { type: String, required: true },
  positionName: { type: String, required: true },
  deptPath: { type: String, required: true },
  empId: { type: String, required: true },
});

const seriesVideoSchema = new mongoose.Schema({
  videoTitle: { type: String, required: true },
  youtubeId: { type: String, required: true },
  groupId: { type: mongoose.Schema.ObjectId, required: true },
  productName: { type: String, required: true },
  productCode: { type: String, required: true },
  uploadDate: { type: Number, required: true },
  updateDate: { type: Number, required: true },
  playTime: { type: String, required: false },
  viewCount: { type: Number, required: true },

  empId: { type: String, required: true },
  empName: { type: String, required: true },
  deptPath: { type: String, required: true },
  description: { type: String },

  isSeries: { type: Boolean, default: false, required: true },
  seriesTitle: { type: String },
});

const videoSchema = new mongoose.Schema({
  videoTitle: { type: String },
  youtubeId: { type: String },
  productName: { type: String, required: true },
  productCode: { type: String, required: true },
  uploadDate: { type: Number, required: true },
  updateDate: { type: Number, required: true },
  playTime: { type: String, required: false },
  viewCount: { type: Number, required: true },

  empId: { type: String, required: true },
  empName: { type: String, required: true },
  deptPath: { type: String, required: true },
  description: { type: String },

  isSeries: { type: Boolean, required: true },

  seriesTitle: { type: String },
  series: [seriesVideoSchema],
});

const ProductSchema = new mongoose.Schema({
  index: { type: Number, unique: false },
  productName: { type: String, required: true },
  productCode: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  staffs: [staffSchema],
  managedVideos: [videoSchema],
});

// ProductSchema.plugin(autoIncrement.plugin, {
//   model: 'lib_video_product',
//   field: 'index',
//   startAt: 1,
//   increment: 1,
// });

const VideoProductModel = mongoose.model('lib_video_product', ProductSchema);

const VideoModel = mongoose.model('lib_video_video', videoSchema);

module.exports = {
  VideoModel,
  VideoProductModel,
};
