const express = require('express');

// Route Definitions
const users = require('./routes/users');

const router = express.Router();

// Use Routes
router.use('/users', users);

module.exports = router;
