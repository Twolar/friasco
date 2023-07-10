const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// User management/these routes subject to change and is currently acting as a placeholder
// As not looking to reinvent the wheel with user management
// But should be good enough for now to build everything else we need off of it for mvp...

// GetUsers
router.get('/', userController.getUsers);

// GetUser
router.get('/:id', userController.getUser);

// NewUser
router.post('/new', userController.newUser);

// UpdateUser
router.patch('/:id', userController.updateUser);

// DeleteUser
router.delete('/:id', userController.deleteUser);

module.exports = router;
