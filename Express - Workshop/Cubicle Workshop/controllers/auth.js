const userModel = require('../models/user');
const tokenBlacklistModel = require('../models/token-blacklist');
const utils = require('../utils/');
const appConfig = require('../app-config');

function getLogin(req, res) {
    res.render('login.hbs');
}

function postLogin(req, res, next) {
    const { username, password } = req.body;
    userModel.findOne({ username })
        .then(user => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
            if (!match) {
                res.render('login.hbs', { message: 'Wrong password or username'});
                return;
            }
            const token = utils.jwt.createToken({ id: user._id });
            res.cookie(appConfig.authCookieName, token);
            res.redirect('/');
        });
}

function getRegister(req, res) {
    res.render('register.hbs')
}

function postRegister(req, res, next) {
    const { username, password, repeatPassword } = req.body;
    // if (password !== repeatPassword) {
    //     res.render('register.hbs', { 
    //         errors: { 
    //             repeatPassword: 'Password and Repeat-Password don\'t match!'
    //         }
    //     });
    //     return;
    // }

    return userModel.create({ username, password }).then(() => {
        res.redirect('/login');
    }).catch(err => {
        if (err.name === 'ValidationError') {
            res.render('register.hbs', {
                errors: err.errors
            });
            return;
        }
        next();
    });
}

function logout(req, res) {
    const token = req.cookies[appConfig.authCookieName];
    tokenBlacklistModel.create({ token }).then(() => {
        res.clearCookie(appConfig.authCookieName).redirect('/');
    });
}

module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout
}