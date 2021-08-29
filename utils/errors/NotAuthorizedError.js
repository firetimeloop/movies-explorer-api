const {
  ERROR_CODE_401,
} = require('../constants');

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

module.exports = NotAuthorizedError;
