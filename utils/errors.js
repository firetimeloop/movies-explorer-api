const InvalidLoginDataError = require('./errors/InvalidLoginDataError');
const IdentificationError = require('./errors/IdentificationError');
const InvalidTokenError = require('./errors/InvalidTokenError');
const NotAllowedError = require('./errors/NotAllowedError');
const NotAuthorizedError = require('./errors/NotAuthorizedError');
const NotFoundError = require('./errors/NotFoundError');
const NotUniqueDataError = require('./errors/NotUniqueDataError');

module.exports = {
  InvalidLoginDataError,
  IdentificationError,
  NotUniqueDataError,
  NotAllowedError,
  NotAuthorizedError,
  InvalidTokenError,
  NotFoundError,
};
