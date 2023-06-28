const { logger } = require('../../utility/logger');
const db = require('../../utility/database');

function GetUsers() {
  const response = {
    message: 'success',
    tempFeedback: 'GetUsers',
  };
  return response;
}

async function GetUser(req) {
  return new Promise((resolve, reject) => {
    // TODO: sql injection
    const sql = 'SELECT * FROM users WHERE id = ?';
    const { id } = req.params;

    // TODO: Refeactor to have this inside user model?
    db.get(sql, id, (error, result) => {
      if (error) {
        return reject(error);
      }
      resolve(result);
    });
  });
}

function NewUser(req) {
  const response = {
    message: 'success',
    tempFeedback: 'NewUser',
    tempReqBody: req.body,
  };
  return response;
}

function UpdateUser(req) {
  const response = {
    message: 'success',
    tempFeedback: 'UpdateUser',
    tempReqBody: req.body,
  };
  return response;
}

function DeleteUser(req) {
  const response = {
    message: 'success',
    tempFeedback: `DeleteUser: ${req.params.id}`,
  };
  return response;
}

module.exports = {
  GetUsers,
  GetUser,
  NewUser,
  UpdateUser,
  DeleteUser,
};
