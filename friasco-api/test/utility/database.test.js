const Database = require('../../src/utility/database');

describe('Database Tests', () => {
  let database;

  beforeAll(() => {
    database = new Database(':memory:');
    return database.initialize();
  });

  afterAll(() => {
    database.close();
  });

  it('should create the users table', () => new Promise((resolve, reject) => {
    database.db.get('SELECT name FROM sqlite_master WHERE type=\'table\' AND name=\'users\'', (err, row) => {
      if (err) {
        reject(err);
      } else if (row) {
        resolve();
      } else {
        reject(new Error('Table not found'));
      }
    });
  }));

  it('should insert two users into the users table', () => new Promise((resolve, reject) => {
    database.db.all('SELECT * FROM users', (err, rows) => {
      if (err) {
        reject(err);
      } else if (rows) {
        expect(rows[0].username).toBe('tbennett');
        expect(rows[1].username).toBe('fpopovich');
        resolve();
      } else {
        reject(new Error('Users not found'));
      }
    });
  }));
});
