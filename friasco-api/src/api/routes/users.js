const express = require('express');
const logger = require('../../utility/logger');
const User = require('../../models/user');

const router = express.Router();

// User management/these routes subject to change and is currently acting as a placeholder
// As not looking to reinvent the wheel with user management
// But should be good enough for now to build everything else we need off of it for mvp...

// GetUsers
router.get('/', async (req, res, next) => {
  logger.info('Users::GetUsers - Initiated');
  try {
    const users = await User.getAll();

    if (users.length > 0) {
      logger.info(`Users::GetUsers - Success`);
      res.status(200).json({
        message: 'success',
        users,
      });
    } else {
      logger.info(`Users::GetUsers - No users found`);
      res.status(204).json();
    }
  } catch (error) {
    logger.error(`Users::GetUsers - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Users::GetUsers - Finished');
});

// GetUser
router.get('/:id', async (req, res, next) => {
  logger.info('Users::GetUser - Initiated');
  try {
    const user = await User.getById(req.params.id);

    if (user) {
      logger.info(`Users::GetUser - Success`);
      res.status(200).json({
        message: 'success',
        user,
      });
    } else {
      logger.info(`Users::GetUser - User not found`);
      res.status(404).json({
        message: 'not found',
      });
    }
  } catch (error) {
    logger.error(`Users::GetUser - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Users::GetUser - Finished');
});

// NewUser
router.post('/new', async (req, res, next) => {
  logger.info('Users::NewUser - Initiated');
  try {
    const createdUserId = await User.createNew(req.body.email, req.body.username, req.body.password);

    if (createdUserId) {
      logger.info(`Users::NewUser - Success`);
      res.status(201).json({
        message: 'success',
        id: createdUserId,
      });
    } else {
      logger.info(`Users::NewUser - Something went wrong`);
      res.status(500).json({
        message: 'internal server error',
      });
    }
  } catch (error) {
    logger.error(`Users::NewUser - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Users::NewUser - Finished');
});

// UpdateUser
router.patch('/:id', async (req, res, next) => {
  logger.info('Users::UpdateUser - Initiated');
  try {
    const changes = await User.updateById(req.params.id, req.body.email, req.body.username, req.body.password);

    if (changes) {
      logger.info(`Users::UpdateUser - Success`);
      res.send({
        message: 'success',
        changes,
      });
    } else if (changes === 0) {
      logger.info('Users::UpdateUser - No row was changed');
      res.status(404).json({
        message: 'not found',
      });
    } else {
      logger.info(`Users::UpdateUser - Something went wrong`);
      res.status(500).json({
        message: 'internal server error',
      });
    }
  } catch (error) {
    logger.error(`Users::UpdateUser - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Users::UpdateUser - Finished');
});

// DeleteUser
router.delete('/:id', async (req, res, next) => {
  logger.info('Users::DeleteUser - Initiated');
  try {
    const changes = await User.deleteById(req.params.id);

    if (changes) {
      logger.info(`Users::DeleteUser - Success`);
      res.send({
        message: 'success',
        changes,
      });
    } else if (changes === 0) {
      logger.info('Users::DeleteUser - User not found');
      res.status(404).json({
        message: 'not found',
      });
    } else {
      logger.info(`Users::DeleteUser - Something went wrong`);
      res.status(500).json({
        message: 'internal server error',
      });
    }
  } catch (error) {
    logger.error(`Users::DeleteUser - Failed: ${error}`);
    res.status(400).json({
      message: error.message,
    });
    next(error);
  }
  logger.info('Users::DeleteUser - Finished');
});

module.exports = router;
