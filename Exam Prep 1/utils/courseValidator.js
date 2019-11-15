const { body } = require('express-validator');

module.exports = [
    body('title', 'Title should be at least 5 symbols!')
        .isLength({ min: 5 })
        .isAlphanumeric()
    ,
    body('description', 'Description should be alphanumeric and max 50 characters!')
        .isLength({ max: 50 })
        .isAlphanumeric()
    ,
    body('imageUrl')
        .custom((value) => {
            if (!value.startsWith('https')) { throw new Error('Image url should start with https!') }
            return true;
        })

];