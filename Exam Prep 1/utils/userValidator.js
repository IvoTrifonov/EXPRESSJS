const { body } = require('express-validator');

module.exports = [
    body('username', 'Username must consist letters and digits, and must be at least 5 symbols!')
        .isLength({ min: 5 })
        .isAlphanumeric()
    ,
    body('password', 'Password must consist letters and digits, and must be at least 5 symbols!ax 50 characters!')
        .isLength({ max: 50 })
        .isAlphanumeric()
    ,
    
];