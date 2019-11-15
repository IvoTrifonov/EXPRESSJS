const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../utils/auth');
const courseValidator = require('../utils/courseValidator')

router.get('/create', auth(), controllers.course.get.create);
router.post('/create', auth(), courseValidator, controllers.course.post.create);

router.get('/details/:courseId', auth(), controllers.course.get.details);

router.get('/edit/:courseId', auth(), controllers.course.get.edit);
router.post('/edit/:courseId', auth(), courseValidator, controllers.course.post.edit);

router.get('/delete/:courseId', auth(), controllers.course.get.delete);
module.exports = router;