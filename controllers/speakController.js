const { handleTalk } = require("../streaming-client-api");

exports.speak = async (req, res) => {
  const text = req.body.text;
  console.log("Received speak request with text:", text);
  if (!text) {
    console.log("No text provided");
    return res.status(400).json({ error: 'No text provided' });
  }
  try {
    const result = await handleTalk(text);
    console.log("handleTalk result:", result);
    res.status(200).json({ success: true });
    console.log("speak endpoint finished!");
  } catch (err) {
    console.error("speak endpoint error:", err);
    res.status(500).json({ error: 'Failed to speak with D-ID' });
  }
};