const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshopController');

router.post('/add', workshopController.addWorkshop);
router.get('/get', workshopController.getWorkshops);

module.exports = router;
