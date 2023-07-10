const express = require('express');
const tripController = require('../controllers/tripController');

const router = express.Router();

// GetTrips
router.get('/', tripController.getTrips);

// GetTrip
router.get('/:id', tripController.getTrip);

// NewTrip
router.post('/new', tripController.newTrip);

// UpdateTrip
router.patch('/:id', tripController.updateTrip);

// DeleteTrip
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
