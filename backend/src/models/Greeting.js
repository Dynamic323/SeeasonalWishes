const mongoose = require('mongoose');

const greetingSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
  status: { type: String, enum: ['pending', 'delivered', 'expired'], default: 'pending' },
  sentAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
  feedback: { type: String, default: '' }
});

module.exports = mongoose.model('Greeting', greetingSchema);