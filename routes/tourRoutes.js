const express = require('express')
const router = express.Router();
const tourController = require('./../controller/tourController');

router.param('id',tourController.checkId)

// ROUTES
router
.route('/')
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.createTour)

router
.route('/:id')
.get(tourController.getSingleTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router