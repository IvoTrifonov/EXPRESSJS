const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../utils/auth');
const userValidator = require('../utils/userValidator');

router.get('/login', controllers.user.get.login);
router.get('/register', controllers.user.get.register);

router.get('/logout', auth(), controllers.user.get.logout);

router.post('/login', controllers.user.post.login);
router.post('/register', userValidator, controllers.user.post.register);

router.post('/refill', auth(), controllers.user.post.edit)


module.exports = router;