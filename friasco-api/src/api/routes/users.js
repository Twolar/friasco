const express = require('express');
const { logger } = require('../../utility/logger');
const usersController = require('../controllers/usersController');

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
router.get('/:id', async (req, res, next) => {
  logger.info('Users::GetUser - Initiated');
  try {
    var user = await usersController.GetUser(req);
    if (user) {
      res.status(200).json({
        user: user,
      });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
    logger.error(`Users::GetUser - Failed: ${error}`);
    next(error);
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
