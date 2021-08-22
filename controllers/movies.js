const Movie = require('../models/movie');
const { SUCCESS_CODE_200, SUCCESS_CODE_201 } = require('../utils/constants');
const { IdentificationError, NotAllowedError } = require('../utils/errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(SUCCESS_CODE_200).send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    owner,
  })
    .then((movie) => res.status(SUCCESS_CODE_201).send({ data: movie }))
    .catch((err) => {
      let error = err;
      if (err.name === 'ValidationError') {
        error = new IdentificationError('Переданы некорректные данные при создании ресурса');
      }
      next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (movie === null) {
        throw new IdentificationError('Карточка с указанным _id не найдена');
      }
      if (movie.owner.toString() !== req.user._id.toString()) {
        throw new NotAllowedError('Нельзя удалять чужие карточки');
      }
    }).then(() => {
      Movie.findByIdAndRemove(req.params.movieId)
        .then((movie) => res.status(SUCCESS_CODE_200).send({ data: movie }))
        .catch(next);
    })
    .catch((err) => {
      let error = err;
      if (err.name === 'CastError') {
        error = new IdentificationError('Передан некорректный _id');
      }
      next(error);
    });
};
