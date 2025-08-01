
const express = require("express");
const router = express.Router();
const videoAgentController = require("../controllers/videoAgentController");

router.post("/stream", videoAgentController.createStream);
router.post("/stream/:streamId/sdp", videoAgentController.sendSDPAnswer);
router.delete("/stream/:streamId", videoAgentController.deleteStream);

module.exports = router;
