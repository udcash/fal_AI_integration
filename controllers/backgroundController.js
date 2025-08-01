const backgroundService = require('../services/backgroundService');

exports.removeBackground = async (req, res) => {
  try {
    const file = req.file; // assuming multer is used
    console.log("Received removeBackground request with file:", file);
    if (!file) {
      console.log("No file uploaded");
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = await backgroundService.removeBgFromFile(file);
    console.log("backgroundService.removeBgFromFile result:", imageUrl);
    res.json({ imageUrl });
    console.log("removeBackground endpoint finished!");
  } catch (error) {
    console.error("removeBackground endpoint error:", error);
    res.status(500).json({ error: error.message });
  }
};
