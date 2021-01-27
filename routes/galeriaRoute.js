const express = require('express');
const router = express.Router();
const galeriaController = require('../controllers/galeriaController');
router.get('/', galeriaController.showGallery);
module.exports = router;


