const { celebrate, Joi } = require('celebrate');

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const resValidation = {
  usersMeVal: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().pattern(/^[^@]+@[^@]+\.[^@]+$/),
      name: Joi.string().required().min(2).max(30),
    }),
  }),
  signinVal: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signupVal: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  moviesVal: celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().max(4).required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(urlRegex),
      trailer: Joi.string().required().pattern(urlRegex),
      thumbnail: Joi.string().required().pattern(urlRegex),
      nameRU: Joi.string().required().pattern(/[а-яА-Я]{1,}[а-яА-Я\s]*/),
      nameEN: Joi.string().required().pattern(/[a-zA-Z]{1,}[a-zA-Z\s]*/),
      movieId: Joi.number().integer().required(),
    }),
  }),
  moviesIdVal: celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().hex().length(24),
    }),
  }),
};

module.exports = resValidation;
