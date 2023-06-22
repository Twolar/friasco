const sqlite3 = require('sqlite3').verbose();
const { logger } = require('./logger');

class Database {
  constructor(databaseName) {
    this.dbSource = databaseName || process.env.DBSOURCE;
    this.db = new sqlite3.Database(this.dbSource, (error) => {
      if (error) {
        logger.error(`Database::constructor - ${err.message}`);
        throw error;
      } else {
        logger.info('Database::constructor - sqLite3 Database setup successfully');
      }
    });
  }

  initialize() {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.initializeUserTable();
        resolve();
      });
    });
  }

  initializeUserTable() {
    const createUserTableSQL = `
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT,
                username TEXT,
                password TEXT
            )
        `;
    this.db.run(createUserTableSQL, (error) => {
      if (error) {
        logger.info('Database::InitiateUserTable - Users table already exists');
      } else {
        logger.info('Database::InitiateUserTable - Creating fresh users table');
        logger.info('Database::InitiateUserTable - Inserting example rows into user table');
        const insertUserSQL = 'INSERT INTO users (email, username, password) VALUES (?,?,?)';
        this.db.run(insertUserSQL, ['taylor@friasco.com', 'tbennett', 'test123']);
        this.db.run(insertUserSQL, ['filip@friasco.com', 'fpopovich', 'test123']);
      }
    });
  }

  close() {
    logger.info('Database::close - Closing database connection');
    this.db.close();
  }
}

module.exports = Database;
