const mongoose = require('mongoose');

const responseLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  endpoint: String,
  request: Object,
  response: Object,
  error: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ResponseLog', responseLogSchema);