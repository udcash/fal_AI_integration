// controllers/videoAgentController.js
const videoAgentService = require("../services/videoAgentServices");

exports.createStream = async (req, res) => {
  try {
    console.log("Received createStream request");
    const data = await videoAgentService.createStream();
    console.log("videoAgentService.createStream result:", data);
    res.json(data);
    console.log("createStream endpoint finished!");
  } catch (err) {
    console.error("Create Stream Error:", err);
    res.status(500).json({ error: "Failed to create stream" });
  }
};

exports.sendSDPAnswer = async (req, res) => {
  const { streamId } = req.params;
  const { session_id, answer } = req.body;
  try {
    console.log("Received sendSDPAnswer request:", { streamId, session_id, answer });
    const response = await videoAgentService.sendSDPAnswer(streamId, session_id, answer);
    console.log("videoAgentService.sendSDPAnswer result:", await response.json());
    res.json({ message: "SDP Answer sent", result: await response.json() });
    console.log("sendSDPAnswer endpoint finished!");
  } catch (err) {
    console.error("SDP Answer Error:", err);
    res.status(500).json({ error: "Failed to send SDP answer" });
  }
};

exports.deleteStream = async (req, res) => {
  const { streamId } = req.params;
  const { session_id } = req.body;
  try {
    console.log("Received deleteStream request:", { streamId, session_id });
    const response = await videoAgentService.deleteStream(streamId, session_id);
    console.log("videoAgentService.deleteStream result:", await response.json());
    res.json({ message: "Stream deleted", result: await response.json() });
    console.log("deleteStream endpoint finished!");
  } catch (err) {
    console.error("Delete Stream Error:", err);
    res.status(500).json({ error: "Failed to delete stream" });
  }
};
