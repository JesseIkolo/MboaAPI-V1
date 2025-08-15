// --- models/waitlist.model.js ---
const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: false,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  __v: {
    type: Number,
    default: 0
  }
}, {
  collection: 'waitlists' // Spécifier explicitement le nom de la collection
});

// Indice partiel pour garantir l'unicité de l'email uniquement lorsqu'il est non vide
// Évite les erreurs E11000 sur les chaînes vides ""
waitlistSchema.index({ email: 1 }, {
  unique: true,
  partialFilterExpression: { email: { $exists: true, $type: 'string', $ne: '' } }
});

module.exports = mongoose.model('Waitlist', waitlistSchema);
