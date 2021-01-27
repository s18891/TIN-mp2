const express = require('express');
const router = express.Router();
const lokalizacjeKoncertowController = require('../controllers/lokalizacjeKoncertowController');
router.get('/mapa', lokalizacjeKoncertowController.showConcertsLocationMap);
router.get('/zdjecia', lokalizacjeKoncertowController.showConcertsLocationPhotos);
module.exports = router;


