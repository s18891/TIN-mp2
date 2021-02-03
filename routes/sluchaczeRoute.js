const express = require('express');
const router = express.Router();
const sluchaczeController = require('../controllers/sluchaczeController');
router.get('/', sluchaczeController.showSluchaczeList);
router.get('/add', sluchaczeController.showAddSluchaczeForm);
router.get('/edit/:IdSluchacza', sluchaczeController.showEditSluchaczeForm);
router.get('/details/:IdSluchacza', sluchaczeController.showSluchaczeDetails);

router.post('/add', sluchaczeController.addSluchacze);
router.post('/edit/:IdSluchacza', sluchaczeController.updateSluchacze);
router.get('/delete/:IdSluchacza', sluchaczeController.deleteSluchacze);


module.exports = router;


