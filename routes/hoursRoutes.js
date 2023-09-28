const express = require('express');
const router = express.Router();
const hoursApi = require('./../controllers/hoursApi');
const authController = require('./../controllers/authController');

router
  .route('/')
  .post(authController.protect, hoursApi.createHours)
  .get(authController.protect, hoursApi.getAllhours);

router
  .route('/:id')
  .patch(authController.protect, hoursApi.updateHours)
  .delete(authController.protect, hoursApi.deleteHour);

module.exports = router;
