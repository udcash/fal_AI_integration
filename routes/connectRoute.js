const express = require("express");
const router = express.Router();
const connectController = require("../controllers/connectController");
router.post("/", connectController.connect);
module.exports = router;
