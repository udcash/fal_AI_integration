const talkService = require('../services/talkService');

exports.startTalkStream = async (req, res) => {
  try {
    const { streamId, sessionId, message } = req.body;
    console.log("Received startTalkStream request:", { streamId, sessionId, message });
    const result = await talkService.sendToDID(streamId, sessionId, message);
    console.log("talkService.sendToDID result:", result);
    res.status(200).json({ success: true, result });
    console.log("startTalkStream endpoint finished!");
  } catch (err) {
    console.error("startTalkStream endpoint error:", err);
    res.status(500).json({ error: err.message });
  }
};
