const mongoose = require('mongoose');

const docSchema = new mongoose.Schema({
  docTitle: { type: String, required: true },
  originDocName: { type: String, required: true },
  docName: { type: String, required: true },
  docPath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
  fileExt: { type: String, required: true },

  productCode: { type: String, required: true },
  productName: { type: String, required: true },

  uploadDate: { type: Number, required: true },
  updateDate: { type: Number, required: true },
  viewCount: { type: Number, required: true },
  size: { type: Number },

  empId: { type: String, required: true },
  empName: { type: String, required: true },
  deptPath: { type: String, required: true },
  description: String,
});

const DocModel = mongoose.model('lib_doc_document', docSchema);

const staffSchema = new mongoose.Schema({
  empName: { type: String, required: true },
  positionName: { type: String, required: true },
  deptPath: { type: String, required: true },
  empId: { type: String, required: true },
});

const docProductSchema = new mongoose.Schema({
  index: { type: Number },
  productName: { type: String, required: true },
  productCode: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  staffs: [staffSchema],
  managedDocs: [docSchema],
});

const DocProductModel = mongoose.model('lib_doc_product', docProductSchema);

const tempDocSchema = new mongoose.Schema({
  // docTitle: { type: String },
  originDocName: { type: String, required: true },
  docName: { type: String, required: true },
  docPath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
  fileExt: { type: String, required: true },

  // projectId: { type: String },
  // productName: { type: String },

  uploadDate: { type: Number, required: true },
  updateDate: { type: Number, required: true },
  // viewCount: { type: Number },
  size: { type: Number },

  // empName: { type: String },
  // deptPath: { type: String },
  // description: String,
});

const TempDocModel = mongoose.model('lib_doc_document_temp', tempDocSchema);

module.exports = {
  DocModel,
  TempDocModel,
  DocProductModel,
};
