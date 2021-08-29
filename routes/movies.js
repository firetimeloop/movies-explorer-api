const router = require('express').Router();
const { moviesVal, moviesIdVal } = require('./validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', moviesVal, createMovie);
router.delete('/movies/:movieId', moviesIdVal, deleteMovie);

module.exports = router;
