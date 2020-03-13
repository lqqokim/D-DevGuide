const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const uploadScheme = new mongoose.Schema({
  name: { type: String, default: '' },
  originalName: { type: String, default: '' },
  size: { type: Number, default: 0 },
  encoding: { type: String, default: '' },
  mimeType: { type: String, default: '' },
});

const UploadModel = mongoose.model('Upload', uploadScheme);

module.exports = {
  UploadModel,
};
