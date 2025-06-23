const mongoose = require('mongoose');
const { Schema } = mongoose;

const referralClickSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  ipAddress: String,
  deviceInfo: String,
  referralCode: String
});

const referralSchema = new Schema({
  referrerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  referralCode: { type: String, required: true, unique: true },
  clicks: [referralClickSchema],
  successfulSignups: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Referral', referralSchema); 