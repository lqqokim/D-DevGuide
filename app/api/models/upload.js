const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const uploadScheme = new mongoose.Schema({
  name: { type: String, default: '', index: true, unique: true },
  file: { type: Object, default: {} },
});

const UploadModel = mongoose.model('Upload', uploadScheme);

module.exports = {
  UploadModel,
};
