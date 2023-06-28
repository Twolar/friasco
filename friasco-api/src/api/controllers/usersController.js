function GetUsers() {
    var response = {
        message: 'success',
        tempFeedback: 'GetUsers',
    }
    return response;
};

function GetUser(req) {
    var response = {
      message: 'success',
      tempFeedback: `GetUser: ${req.params.id}`
    }
    return response
}

function NewUser(req) {
    var response = {
        message: 'success',
        tempFeedback: 'NewUser',
        tempReqBody: req.body
      }
    return response
}

function UpdateUser(req) {
    var response = {
        message: 'success',
        tempFeedback: 'UpdateUser',
        tempReqBody: req.body
      }
    return response
}

function DeleteUser(req) {
    var response = {
      message: 'success',
      tempFeedback: `DeleteUser: ${req.params.id}`
    }
    return response
}

module.exports = {
    GetUsers,
    GetUser,
    NewUser,
    UpdateUser,
    DeleteUser
}