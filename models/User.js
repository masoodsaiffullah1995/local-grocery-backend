const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  role: { type: String, default: 'user' }, // user or admin
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
