const express = require('express');
const router = express.Router();
const rezerwacjeController = require('../controllers/rezerwacjeController');
router.get('/', rezerwacjeController.showRezerwacjeList);
router.get('/add', rezerwacjeController.showAddRezerwacjeForm);
router.get('/edit/:IdRezerwacji', rezerwacjeController.showEditRezerwacjeForm);
router.get('/details/:IdRezerwacji', rezerwacjeController.showRezerwacjeDetails);


router.post('/add', rezerwacjeController.addRezerwacje);
router.post('/edit/:IdRezerwacji', rezerwacjeController.updateRezerwacje);
router.get('/delete/:IdRezerwacji', rezerwacjeController.deleteRezerwacje);


module.exports = router;


