const express = require('express');
const router = express.Router();
const speakController = require('../controllers/speakController');

router.post('/', speakController.speak);

module.exports = router;