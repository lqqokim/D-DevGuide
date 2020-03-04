const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  empName: { type: String, required: true },
  positionName: { type: String, required: true },
  deptPath: { type: String, required: true },
  empId: { type: String, required: true },
});

const fileSchema = new mongoose.Schema({
  fileTitle: { type: String, required: true },
  originFileName: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },

  productCode: { type: String, required: true },
  productName: { type: String, required: true },

  uploadDate: { type: Number, required: true },
  updateDate: { type: Number, required: true },
  downloadCount: { type: Number, required: true },
  size: { type: Number },

  empId: { type: String, required: true },
  empName: { type: String, required: true },
  deptPath: { type: String, required: true },
  description: String,
});

const FileModel = mongoose.model('lib_download_file', fileSchema);

const fileProductSchema = new mongoose.Schema({
  index: { type: Number },
  productName: { type: String, required: true },
  productCode: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  managedFiles: [fileSchema, { index: { type: Number } }],
  staffs: [staffSchema],
});

const FileProductModel = mongoose.model(
  'lib_download_product',
  fileProductSchema
);

module.exports = {
  FileProductModel,
  FileModel,
};
