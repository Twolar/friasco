const express = require('express');
const { logger } = require('../../utility/logger');
const User = require('../../models/user');

const router = express.Router();

// User management/these routes subject to change and is currently acting as a placeholder
// As not looking to reinvent the wheel with user management
// But should be good enough for now to build everything else we need off of it for mvp...

// TODO: Login endpoint
// As an exercise could be fun to add:
// - Password hash/salting
// - JWT generation & authentication for endpoints

// GetUsers
router.get('/', async (req, res) => {
  logger.info('Users::GetUsers - Initiated');
  try {
    const users = await User.getAll();

    if (users.length > 0) {
      res.status(200).json({
        message: 'success',
        users,
      });
    } else {
      res.status(204).json();
    }
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
router.get('/:id', async (req, res) => {
  logger.info('Users::GetUser - Initiated');
  try {
    const user = await User.getById(req.params.id);

    if (user) {
      res.status(200).json({
        message: 'success',
        user,
      });
    } else {
      res.status(404).json({
        message: 'not found',
      });
    }
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
router.post('/new', async (req, res) => {
  logger.info('Users::NewUser - Initiated');
  try {
    const createdUserId = await User.createNew(req.body.email, req.body.username, req.body.password);
    if (createdUserId) {
      res.status(201).json({
        message: 'success',
        id: createdUserId,
      });
    } else {
      res.status(500).json({
        message: 'internal server error',
      });
    }
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
router.patch('/:id', async (req, res) => {
  logger.info('Users::UpdateUser - Initiated');
  try {
    const changes = await User.updateById(req.params.id, req.body.email, req.body.username, req.body.password);

    if (changes) {
      res.send({
        message: 'success',
        changes,
      });
    } else if (changes === 0) {
      res.status(404).json({
        message: 'not found',
      });
    } else {
      res.status(500).json({
        message: 'internal server error',
      });
    }
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
router.delete('/:id', async (req, res) => {
  logger.info('Users::DeleteUser - Initiated');
  try {
    const changes = await User.deleteById(req.params.id);

    if (changes) {
      res.send({
        message: 'success',
        changes,
      });
    } else if (changes === 0) {
      res.status(404).json({
        message: 'not found',
      });
    } else {
      res.status(500).json({
        message: 'internal server error',
      });
    }
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
