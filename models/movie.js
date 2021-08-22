const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    maxlength: 4,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(
        value,
        { protocols: ['http', 'https'], require_tld: false, require_protocol: false },
      ),
      message: 'Must be a Valid URL',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(
        value,
        { protocols: ['http', 'https'], require_tld: false, require_protocol: false },
      ),
      message: 'Must be a Valid URL',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(
        value,
        { protocols: ['http', 'https'], require_tld: false, require_protocol: false },
      ),
      message: 'Must be a Valid URL',
    },
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const ruRegex = /[а-яА-Я]{1,}[а-яА-Я\s]*/;
        return ruRegex.test(value);
      },
      message: 'Must be written in Russian',
    },
  },
  nameEN: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const enRegex = /[a-zA-Z]{1,}[a-zA-Z\s]*/;
        return enRegex.test(value);
      },
      message: 'Must be written in English',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
