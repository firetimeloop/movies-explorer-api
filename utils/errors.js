/* eslint-disable max-classes-per-file */
import {
  ERROR_CODE_401,
  ERROR_CODE_403,
  ERROR_CODE_404,
  ERROR_CODE_409,
} from './constants';

class InvalidLoginDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

class IdentificationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'IdentificationError';
    this.statusCode = ERROR_CODE_404;
  }
}

class NotUniqueDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_409;
  }
}

class NotAllowedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_403;
  }
}

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_404;
  }
}

module.exports = {
  InvalidLoginDataError,
  IdentificationError,
  NotUniqueDataError,
  NotAllowedError,
  NotAuthorizedError,
  InvalidTokenError,
  NotFoundError,
};
