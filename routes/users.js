const router = require('express').Router();
const { usersMeVal } = require('./validation');

const {
  updateUserMe, getUserMe,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.patch('/users/me', usersMeVal, updateUserMe);

module.exports = router;
