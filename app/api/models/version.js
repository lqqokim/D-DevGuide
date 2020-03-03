const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const versionScheme = new mongoose.Schema({
  productCode: { type: String, default: '' },
  tagName: { type: String, default: '' },
  createdAt: { type: String, default: '' },
  description: { type: String, default: '' },
  authorName: { type: String, default: '' },
  authorID: { type: String, default: '' },
  index: { type: Number },
});

const VersionModel = mongoose.model('Versions', versionScheme);

module.exports = {
  VersionModel,
};
