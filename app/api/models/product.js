const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const productScheme = new mongoose.Schema({
  productType: { type: String, default: '' },
  productName: { type: String, default: '' },
  productDescription: { type: String, default: '' },
  projectId: { type: String, default: '' },
  targetBranch: { type: String, default: '' },
  manualDocPath: { type: String, default: '' },
  APIDocPath: { type: String, default: '' },
  attachmentFilePath: { type: String, default: '' },
});

const ProductModel = mongoose.model('Product', productScheme);

module.exports = {
  ProductModel,
};
