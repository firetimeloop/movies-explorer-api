const { JWT } = process.env;
const jwt = require('jsonwebtoken');
const { NotAuthorizedError, InvalidTokenError } = require('../utils/errors');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if ((!authorization || !authorization.startsWith('Bearer ')) && !req.cookies.jwt) {
    throw new NotAuthorizedError('Необходима авторизация');
  }

  const token = req.cookies.jwt || authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT);
  } catch (err) {
    throw new InvalidTokenError('Некорректный токен');
  }

  req.user = payload;

  next();
};
