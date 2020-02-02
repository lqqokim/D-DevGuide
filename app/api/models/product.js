const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const staffSchema = new mongoose.Schema({
  empName: { type: String, required: true },
  empId: { type: String, required: true },
  writeAuthority: { type: Boolean, required: true },
  mergeAuthority: { type: Boolean, required: true },
});

const productScheme = new mongoose.Schema({
  productName: { type: String, default: '', required: true },
  productCode: { type: String, default: '', unique: true, required: true },
  description: { type: String, default: '', required: true },
  apiUse: { type: Boolean, default: false, required: true },
  projectId: { type: Number, default: '', unique: true, required: true },
  targetBranch: { type: String, default: '', required: true },
  manualDocPath: { type: String, default: '', required: true },
  APIDocPath: { type: String, default: '' },
  staffs: [staffSchema],
});

const ProductModel = mongoose.model('Product', productScheme);

module.exports = {
  ProductModel,
};
