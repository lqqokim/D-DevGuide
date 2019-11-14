const mongoose = require('mongoose');

const seriesVideoSchema = new mongoose.Schema({
  videoTitle: { type: String, required: true },
  youtubeId: { type: String, required: true },
  thumbnail: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
  playTime: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },
});

const videoSchema = new mongoose.Schema({
  videoTitle: { type: String },
  youtubeId: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  productType: { type: String, default: '' },

  uploadDate: { type: Date, default: Date.now },
  playTime: { type: Number, default: 0 },
  viewCount: { type: Number, default: 0 },

  empName: { type: String, default: '' },
  depthPath: { type: String, default: '' },
  description: { type: String, default: '' },

  isSeries: { type: Boolean, default: false },
  seriesTitle: { type: String, default: '' },
  series: [seriesVideoSchema],
});

const VideoModel = mongoose.model('Video', videoSchema);

module.exports = {
  VideoModel,
};
