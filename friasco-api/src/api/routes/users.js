const express = require('express');
const { logger } = require('../../utility/logger');

const router = express.Router();

// GetUsers
router.get('/', (req, res) => {
  logger.info('Users::GetUsers - Initiated');
  try {
    res.json({
      message: 'success',
      tempFeedback: 'GetUsers',
    });
  } catch (error) {
    res.status(400).json({
      message: err.message,
    });
    logger.error(`Users::GetUsers - Failed: ${err}`);
    return;
  }
  logger.info('Users::GetUsers - Finished');
});

// GetUser
router.get('/:id', (req, res) => {
  logger.info('Users::GetUser - Initiated');
  try {
    res.json({
      message: 'success',
      tempFeedback: 'GetUser',
    });
  } catch (error) {
    res.status(400).json({
      message: err.message,
    });
    logger.error(`Users::GetUser - Failed: ${err}`);
    return;
  }
  logger.info('Users::GetUser - Finished');
});

// NewUser
router.post('/new', (req, res) => {
  logger.info('Users::NewUser - Initiated');
  try {
    res.json({
      message: 'success',
      tempFeedback: 'NewUser',
    });
  } catch (error) {
    res.status(400).json({
      message: err.message,
    });
    logger.error(`Users::NewUser - Failed: ${err}`);
    return;
  }
  logger.info('Users::NewUser - Finished');
});

// UpdateUser
router.patch('/:id', (req, res) => {
  logger.info('Users::UpdateUser - Initiated');
  try {
    res.json({
      message: 'success',
      tempFeedback: 'UpdateUser',
    });
  } catch (error) {
    res.status(400).json({
      message: err.message,
    });
    logger.error(`Users::UpdateUser - Failed: ${err}`);
    return;
  }
  logger.info('Users::UpdateUser - Finished');
});

// DeleteUser
router.delete('/:id', (req, res) => {
  logger.info('Users::DeleteUser - Initiated');
  try {
    res.json({
      message: 'success',
      tempFeedback: 'DeleteUser',
    });
  } catch (error) {
    res.status(400).json({
      message: err.message,
    });
    logger.error(`Users::DeleteUser - Failed: ${err}`);
    return;
  }
  logger.info('Users::DeleteUser - Finished');
});

module.exports = router;
