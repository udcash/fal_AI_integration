const express = require("express");
const router = express.Router();
const backgroundController = require("../controllers/backgroundController");
const multer = require("multer");
const path = require("path");

// Upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.post("/remove", upload.single("image"), backgroundController.removeBackground);

module.exports = router;
