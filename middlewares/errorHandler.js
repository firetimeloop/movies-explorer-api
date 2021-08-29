const { ERROR_CODE_500 } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_500, message } = err;

  next();

  return res.status(statusCode)
    .send({
      message: message || 'На сервере произошла ошибка',
    });
};
