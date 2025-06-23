const mongoose = require('mongoose');
const { Schema } = mongoose;

const rewardRuleSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  type: { type: String, enum: ['premium_month', 'cashback', 'badge'], required: true },
  criteria: {
    minSignups: { type: Number, default: 1 },
    minType: { type: String, enum: ['freemium', 'premium', 'any'], default: 'any' }
  },
  rewardValue: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RewardRule', rewardRuleSchema); 