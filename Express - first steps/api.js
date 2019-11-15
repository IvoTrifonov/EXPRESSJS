const express = require('express');
const router = express.Router();
const users = [
    { 
        id: 0,
        firstname: 'Ivaka',
        age: 23
    },
    { 
        id: 1,
        firstname: 'Pesho',
        age: 23
    },
    { 
        id: 2,
        firstname: 'Gosho',
        age: 23
    },
    { 
        id: 3,
        firstname: 'Stamat',
        age: 23
    }
];



function checkUserId(req, res, next) {
    if (!Number(req.params.id)) {
        res.send('User id must be number!');
        next(new Error('Invald id!'));
    } else {
        next();
    }
}

router.get('/user', (req, res) => {
    res.send(users);
});

router.get('/user/:id', checkUserId, (req, res) => {
    const user = users.find(u => u.id === +req.params.id);
    res.send(user);
});

module.exports = router;