const {
  ERROR_CODE_404,
} = require('../constants');

class IdentificationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IdentificationError';
    this.statusCode = ERROR_CODE_404;
  }
}

module.exports = IdentificationError;
