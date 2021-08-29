const {
  ERROR_CODE_403,
} = require('../constants');

class NotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_403;
  }
}

module.exports = NotAllowedError;
