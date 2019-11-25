const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  docTitle: { type: String, required: true },
  originDocName: { type: String, required: true },
  docName: { type: String, required: true },
  docPath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },

  projectId: { type: String, required: true },
  productName: { type: String, required: true },

  uploadDate: { type: Number, required: true },
  updateDate: { type: Number, required: true },
  viewCount: { type: Number, required: true },
  size: { type: Number },

  empName: { type: String, required: true },
  depthPath: { type: String, required: true },
  description: String,
});

const DocModel = mongoose.model('document', docSchema);

const staffSchema = new mongoose.Schema({
  empName: { type: String, required: true },
  positionName: { type: String, required: true },
  depthPath: { type: String, required: true },
  empId: { type: String, required: true },
});

const docProduct = new mongoose.Schema({
  productName: { type: String, required: true },
  productCode: { type: String, required: true },
  description: { type: String, required: true },
  staff: [staffSchema],
});

const DocProductModel = mongoose.model('doc_product', docProduct);

module.exports = {
  DocModel,
  DocProductModel,
};
