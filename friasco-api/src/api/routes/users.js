const express = require('express');
const { logger } = require('../../utility/logger');
const userController = require('../controllers/usersController');

const router = express.Router();

// GetUsers
router.get('/', (req, res) => {
  logger.info('Users::GetUsers - Initiated');
  try {
    res.json(userController.GetUsers());
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    logger.error(`Users::GetUsers - Failed: ${error}`);
    return;
  }
  logger.info('Users::GetUsers - Finished');
});

// GetUser
router.get('/:id', (req, res) => {
  logger.info('Users::GetUser - Initiated');
  try {
    res.json(userController.GetUser(req));
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    logger.error(`Users::GetUser - Failed: ${error}`);
    return;
  }
  logger.info('Users::GetUser - Finished');
});

// NewUser
router.post('/new', (req, res) => {
  logger.info('Users::NewUser - Initiated');
  try {
    res.json(userController.NewUser(req));
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    logger.error(`Users::NewUser - Failed: ${error}`);
    return;
  }
  logger.info('Users::NewUser - Finished');
});

// UpdateUser
router.patch('/:id', (req, res) => {
  logger.info('Users::UpdateUser - Initiated');
  try {
    res.json(userController.UpdateUser(req));
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    logger.error(`Users::UpdateUser - Failed: ${error}`);
    return;
  }
  logger.info('Users::UpdateUser - Finished');
});

// DeleteUser
router.delete('/:id', (req, res) => {
  logger.info('Users::DeleteUser - Initiated');
  try {
    res.json(userController.DeleteUser(req));
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    logger.error(`Users::DeleteUser - Failed: ${error}`);
    return;
  }
  logger.info('Users::DeleteUser - Finished');
});

module.exports = router;
