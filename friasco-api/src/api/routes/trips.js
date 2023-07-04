const express = require('express');
const logger = require('../../utility/logger');
const Trip = require('../../models/trip');

const router = express.Router();

// GetTrips
router.get('/', async (req, res, next) => {
  logger.info('Trips::GetTrips - Initiated');
  try {
    const trips = await Trip.getAll();

    if (trips.length > 0) {
      logger.info('Trips::GetTrips - Success');
      res.status(200).json({
        message: 'success',
        trips,
      });
    } else {
      logger.info('Trips::GetTrips -  No trips found');
      res.status(204).json();
    }
  } catch (error) {
    logger.error(`Trips::GetTrips - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Trips::GetTrips - Finished');
});

// GetTrip
router.get('/:id', async (req, res, next) => {
  logger.info('Trips::GetTrip - Initiated');
  try {
    const trip = await Trip.getById(req.params.id);

    if (trip) {
      logger.info('Trips::GetTrip - Success');
      res.status(200).json({
        message: 'success',
        trip,
      });
    } else {
      logger.info(`Trips::GetTrip - Trip not found`);
      res.status(404).json({
        message: 'not found',
      });
    }
  } catch (error) {
    logger.error(`Trips::GetTrip - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Trips::GetTrip - Finished');
});

// NewTrip
router.post('/new', async (req, res, next) => {
  logger.info('Trips::NewTrip - Initiated');
  try {
    const newTripData = new Trip(null, req.body.userId, req.body.location, req.body.startDate, req.body.endDate, req.body.status, req.body.privacyStatus);
    const createdTripId = await Trip.createNew(newTripData);

    if (createdTripId) {
      logger.info('Trips::NewTrip - Success');
      res.status(201).json({
        message: 'success',
        id: createdTripId,
      });
    } else {
      logger.info(`Trips::NewTrip - Something went wrong`);
      res.status(500).json({
        message: 'internal server error',
      });
    }
  } catch (error) {
    logger.error(`Trips::NewTrip - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Trips::NewTrip - Finished');
});

// UpdateTrip
router.patch('/:id', async (req, res, next) => {
  logger.info('Trips::UpdateTrip - Initiated');
  try {
    const updateTripData = new Trip(req.params.id, req.body.userId, req.body.location, req.body.startDate, req.body.endDate, req.body.status, req.body.privacyStatus);
    const changes = await Trip.updateById(updateTripData);

    if (changes) {
      logger.info('Trips::UpdateTrip - Success');
      res.send({
        message: 'success',
        changes,
      });
    } else if (changes === 0) {
      logger.info('Trips::UpdateTrip - No row was changed');
      res.status(404).json({
        message: 'not found',
      });
    } else {
      logger.info(`Trips::UpdateTrip - Something went wrong`);
      res.status(500).json({
        message: 'internal server error',
      });
    }
  } catch (error) {
    logger.error(`Trips::UpdateTrip - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Trips::UpdateTrip - Finished');
});

// DeleteTrip
router.delete('/:id', async (req, res, next) => {
  logger.info('Trips::DeleteTrip - Initiated');
  try {
    const changes = await Trip.deleteById(req.params.id);

    if (changes) {
      logger.info('Trips::DeleteTrip - Success');
      res.send({
        message: 'success',
        changes,
      });
    } else if (changes === 0) {
      logger.info('Trips::DeleteTrip - Trip not found');
      res.status(404).json({
        message: 'not found',
      });
    } else {
      logger.info(`Trips::DeleteTrip - Something went wrong`);
      res.status(500).json({
        message: 'internal server error',
      });
    }
  } catch (error) {
    logger.error(`Trips::DeleteTrip - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Trips::DeleteTrip - Finished');
});

module.exports = router;
