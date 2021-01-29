const express = require('express');
const router = express.Router();
const koncertyController = require("../controllers/koncertyController");
router.get('/', koncertyController.showKoncertyList);
router.get('/add', koncertyController.showAddKoncertyForm);
router.get('/edit/:IdKoncertu', koncertyController.showEditKoncertyForm);
router.get('/details/:IdKoncertu', koncertyController.showKoncertyDetails);



router.post('/add', koncertyController.addKoncerty);
router.post('/edit/:IdKoncertu', koncertyController.updateKoncerty);
router.get('/delete/:IdKoncertu', koncertyController.deleteKoncerty);


module.exports = router;


