const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  storeName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
}, { timestamps: true });

storeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Store', storeSchema);
