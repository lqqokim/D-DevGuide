const mongoose = require('mongoose');

const seriesVideoSchema = new mongoose.Schema({
  videoTitle: { type: String, required: true },
  youtubeId: { type: String, required: true },
  projectId: { type: String, required: true },
  productName: { type: String, required: true },
  uploadDate: { type: Number, required: true },
  updateDate: { type: Number, required: true },
  playTime: { type: Number, required: true },
  viewCount: { type: Number, required: true },

  empName: { type: String, required: true },
  depthPath: { type: String, required: true },
  description: { type: String },

  isSeries: { type: Boolean, default: false, required: true },
  seriesTitle: { type: String },
});

const videoSchema = new mongoose.Schema({
  videoTitle: { type: String },
  youtubeId: { type: String },
  projectId: { type: String, required: true },
  productName: { type: String, required: true },
  uploadDate: { type: Number, required: true },
  updateDate: { type: Number, required: true },
  playTime: { type: Number, required: true },
  viewCount: { type: Number, required: true },

  empName: { type: String, required: true },
  depthPath: { type: String, required: true },
  description: { type: String },

  isSeries: { type: Boolean, required: true },

  seriesTitle: { type: String },
  series: [seriesVideoSchema],
});

const VideoModel = mongoose.model('Video', videoSchema);

module.exports = {
  VideoModel,
};
