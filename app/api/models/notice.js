const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const noticeScheme = new mongoose.Schema({
  productCode: { type: String, default: '' },
  category: { type: String, default: '' },
  noticeTitle: { type: String, default: '' },
  noticeDescription: { type: String, default: '' },
  filePath: { type: String, default: '' },
  pageTitle: { type: String, default: '' },
  writeTime: { type: String, default: '' },
  writer: { type: String, default: '' },
});

const NoticeModel = mongoose.model('Notice', noticeScheme);

module.exports = {
  NoticeModel,
};
