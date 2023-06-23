const sqlite3 = require('sqlite3').verbose();
const { logger } = require('./logger');

const dbSource = process.env.DBSOURCE || 'friasco.db';

let db = new sqlite3.Database(dbSource, (err) => {
  if (err) {
    logger.err(`Database::constructor - ${err.message}`);
    throw err;
  } else {
    logger.info(`Database::constructor - Connected to ${dbSource} database successfully`);
  }
});

db.initialize = () => {
  db.serialize(() => {
    initializeUserTable();
  });
}

db.closeConnection = () => {
  db.close((err) => {
    if (err) {
      logger.error('Database::close - ' + err.message);
    } else {
      logger.info(`Database::close - Closed connection to ${dbSource} database successfully`);
    }
  })
}

function initializeUserTable() {
  const createUserTableSQL = `
      CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT,
          username TEXT,
          password TEXT
      )
  `;
  db.run(createUserTableSQL, (err) => {
    if (err) {
      logger.info('Database::initializeUserTable - ' + err.message);
    } else {
      logger.info('Database::initializeUserTable - Creating fresh users table');
      logger.info('Database::initializeUserTable - Inserting example rows into user table');
      const insertUserSQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)';
      db.run(insertUserSQL, ['taylor@friasco.com', 'tbennett', 'test123']);
      db.run(insertUserSQL, ['filip@friasco.com', 'fpopovich', 'test123']);
    }
  });
}

module.exports = db;
