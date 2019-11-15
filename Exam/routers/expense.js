const router = require('express').Router();
const controllers = require('../controllers');
const auth = require('../utils/auth');
// const courseValidator = require('../utils/courseValidator');

router.get('/create', auth(), controllers.expense.get.create);
router.post('/create', auth(), controllers.expense.post.create);
router.get('/report/:expenseId', auth(), controllers.expense.get.edit);
router.get('/delete/:expenseId',auth(), controllers.expense.get.delete);
module.exports = router;