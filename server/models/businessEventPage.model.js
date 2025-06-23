const mongoose = require('mongoose');
const { Schema } = mongoose;

const businessEventPageSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Propriétaire premium
  subscription: { type: Schema.Types.ObjectId, ref: 'Transaction', required: true }, // Abonnement actif
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  logo: { type: String },
  category: { type: String },
  location: { type: String },
  audienceTargeting: { type: [String], default: [] },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  stats: {
    views: { type: Number, default: 0 },
    interactions: { type: Number, default: 0 },
    geoStats: { type: Map, of: Number, default: {} }, // { region: count }
    categoryStats: { type: Map, of: Number, default: {} }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

module.exports = mongoose.model('BusinessEventPage', businessEventPageSchema); 