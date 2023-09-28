const express = require('express');
const router = express.Router();
const hoursApi = require('./../controllers/hoursApi');
const authController = require('./../controllers/authController');

router.route('/').post(authController.protect, hoursApi.createHours);

module.exports = router;
