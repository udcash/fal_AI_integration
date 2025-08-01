const talkService = require('../services/talkService');

exports.startTalkStream = async (req, res) => {
  try {
    const { streamId, sessionId, message } = req.body;
    const result = await talkService.sendToDID(streamId, sessionId, message);
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
