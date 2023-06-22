require('dotenv').config();
const express = require('express');
const { logger } = require('./src/utility/logger');

const app = express();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.send('Friasco Hello World!');
});

app.listen(port, () => {
  console.log(`Friasco Application listening on ${port}`);
  logger.info(`Friasco Application listening on ${port}`);
});
