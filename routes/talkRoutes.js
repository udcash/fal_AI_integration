const express = require("express");
const router = express.Router();
const talkController = require("../controllers/talkController");

router.post("/", talkController.startTalkStream);

module.exports = router;
