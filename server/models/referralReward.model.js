const mongoose = require('mongoose');
const { Schema } = mongoose;

const referralRewardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ruleId: { type: Schema.Types.ObjectId, ref: 'RewardRule', required: true },
  rewardType: { type: String, required: true },
  rewardValue: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'granted', 'used'], default: 'pending' },
  grantedAt: { type: Date },
  usedAt: { type: Date }
});

module.exports = mongoose.model('ReferralReward', referralRewardSchema); 