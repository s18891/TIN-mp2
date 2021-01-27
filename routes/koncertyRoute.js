const express = require('express');
const router = express.Router();
const koncertyController = require("../controllers/koncertyController");
router.get('/', koncertyController.showKoncertyList);
router.get('/add', koncertyController.showAddKoncertyForm);
router.get('/edit/:IdKoncertu', koncertyController.showEditKoncertyForm);
router.get('/details/:IdKoncertu', koncertyController.showKoncertyDetails);
module.exports = router;



router.post('/add', koncertyController.addKoncerty);
router.post('/edit', koncertyController.updateKoncerty);
router.get('/delete/:IdRezerwacji', koncertyController.deleteKoncerty);


module.exports = router;


