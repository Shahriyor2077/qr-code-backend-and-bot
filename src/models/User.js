const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  branch: { type: String, required: true },
  checkCount: { type: Number, default: 0 },
  checkHistory: [{ addedAt: { type: Date, default: Date.now }, addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Moderator' } }],
  qrCode: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Moderator' }
}, { timestamps: true });

module.exports = mongoose.model('User', schema);
