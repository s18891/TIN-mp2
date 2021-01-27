const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
router.get('/video1', videoController.showVideo1);
router.get('/video2', videoController.showVideo2);
module.exports = router;


