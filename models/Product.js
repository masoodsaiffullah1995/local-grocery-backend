const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }, // which store
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
