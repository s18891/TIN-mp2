const express = require('express');
const router = express.Router();
const historiaController = require('../controllers/historiaController');
router.get('/', historiaController.showHistory);
module.exports = router;


