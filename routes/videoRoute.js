const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
router.get('/1', videoController.showVideo1);
router.get('/2', videoController.showVideo2);
module.exports = router;


