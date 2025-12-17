const mongoose = require('mongoose');

const checkHistorySchema = new mongoose.Schema({
  addedAt: { type: Date, default: Date.now },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Moderator' }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  branch: { type: String, required: true },
  checkCount: { type: Number, default: 0 },
  checkHistory: [checkHistorySchema],
  qrCode: { type: String },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Moderator' }
});

module.exports = mongoose.model('User', userSchema);
