const router = require('express').Router();

const {
  defaultGet,
} = require('../controllers/index');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use('/', usersRouter);
router.use('/', moviesRouter);

router.get('/', defaultGet);

module.exports = router;
