const db = require('../utility/database');

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  // TODO: SQL Injection...

  static async getAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      db.all(query, (error, rows) => {
        if (error) {
          reject(error);
        } else if (!rows) {
          resolve(null);
        } else {
          resolve(rows);
        }
      });
    });
  }

  static async getById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.get(query, id, (error, row) => {
        if (error) {
          reject(error);
        } else if (!row) {
          resolve(null);
        } else {
          const user = new User(row.id, row.username, row.password);
          resolve(user);
        }
      });
    });
  }

  static async createNew(username, password) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
      db.run(query, [username, password], function (error) {
        if (error) {
          reject(error);
        } else {
          const userId = this.lastID;
          resolve(userId);
        }
      });
    });
  }

  static async updateById(id, username, password) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
      db.run(query, [username, password, id], (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  static async deleteById(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      db.run(query, id, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = User;
