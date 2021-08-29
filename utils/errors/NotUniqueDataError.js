const {
  ERROR_CODE_409,
} = require('../constants');

class NotUniqueDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_409;
  }
}

module.exports = NotUniqueDataError;
