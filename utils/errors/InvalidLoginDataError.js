const {
  ERROR_CODE_401,
} = require('../constants');

class InvalidLoginDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

module.exports = InvalidLoginDataError;
