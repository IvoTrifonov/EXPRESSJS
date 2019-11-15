const jwt = require('./jwt');
const config = require('../config/config');
const models = require('../models');

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        const token = req.cookies[config.cookie] || '';
        Promise.all([
            jwt.verifyToken(token),
        ]).then(([data]) => {
            models.User.findById(data.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            if (!redirectUnauthenticated) { next(); return; }
            next(err);
        });
    };
}

module.exports = auth;