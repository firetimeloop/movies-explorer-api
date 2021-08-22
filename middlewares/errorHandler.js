const { ERROR_CODE_500 } = require('../utils/constants');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_500, message } = err;
  return res.status(statusCode)
    .send({
      message: message || 'На сервере произошла ошибка',
    });
};
