const { handleConnect } = require("../streaming-client-api");

exports.connect = async (req, res) => {
  try {
    const { apiKey, sourceUrl } = req.body;
    console.log("Received connect request with:", { apiKey, sourceUrl });
    const result = await handleConnect({ apiKey, sourceUrl });
    console.log("handleConnect result:", result);
    res.status(200).json({ success: true, stream: result });
    console.log("connect endpoint finished!");
  } catch (err) {
    console.error("connect endpoint error:", err);
    res.status(500).json({ error: "Failed to connect to D-ID" });
  }
};
