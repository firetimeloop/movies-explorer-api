const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SUCCESS_CODE_200, SUCCESS_CODE_201 } = require('../utils/constants');
const { IdentificationError, NotUniqueDataError } = require('../utils/errors');

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user === null) {
        throw new IdentificationError('Пользователь с указанным _id не найден');
      }
      res.status(SUCCESS_CODE_200).send({ data: user });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .status(200).send({ data: 'авторизация успешна' });
    })
    .catch(next);
};

module.exports.signout = (req, res) => {
  res.status(202).clearCookie('jwt').send({ data: 'успешный выход из учетной записи' });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.init().then(() => {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({
        name,
        email,
        password: hash,
      }))
      .then((user) => res.status(SUCCESS_CODE_201).send({
        data: {
          name: user.name,
          email: user.email,
        },
      }))
      .catch((err) => {
        let error = err;
        if (err.name === 'MongoError' && err.code === 11000) {
          error = new NotUniqueDataError('Пользователь с таким email уже есть');
        }
        if (err.name === 'ValidationError') {
          error = new IdentificationError('Переданы некорректные данные при создании ресурса');
        }
        next(error);
      });
  });
};

module.exports.updateUserMe = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user === null) {
        throw new IdentificationError('Пользователь с указанным _id не найден');
      }
      res.status(SUCCESS_CODE_200).send({ data: user });
    })
    .catch((err) => {
      let error = err;
      if (err.name === 'ValidationError') {
        error = new IdentificationError('Переданы некорректные данные при редактировании ресурса');
      }
      next(error);
    });
};
