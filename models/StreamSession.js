const mongoose = require('mongoose');

const streamSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  streamId: String,
  sessionId: String,
  offer: Object,
  iceServers: Array,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'active' }
});

module.exports = mongoose.model('StreamSession', streamSessionSchema);