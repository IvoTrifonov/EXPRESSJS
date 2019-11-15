const models = require('../models');
const jwt = require('../utils/jwt');
const config = require('../config/config');
const { validationResult } = require('express-validator');

module.exports = {  
    get: {
        login: (req, res, next) => {
            res.render('loginPage.hbs', { pageTitle: 'Login Page' });
        },

        register: (req, res, next) => {
            res.render('registerPage.hbs', { pageTitle: 'Register Page' });
        },

        logout: (req, res, next) => {
            res.clearCookie(config.cookie).redirect('/home');
        }
    },

    post: {
        login: (req, res, next) => {
            const { username, password } = req.body;

            models.User.findOne({ username }).then((user) => {
                Promise.all([user, user.matchPassword(password)])
                    .then(([user, match]) => {
                        if (!match) {
                            console.log('Password is invalid');
                            return;
                        }

                        const token = jwt.createToken({ id: user._id });

                    
                        res
                            .cookie(config.cookie, token)
                            .redirect('/home/');

                    })
            })
        },

        register: (req, res, next) => {
            const { username, password, repeatPassword } = req.body;
            const arePasswordsEqual = password === repeatPassword;

            const errors = validationResult(req);
            

            if (!errors.isEmpty()) {
                return res.render('registerPage.hbs', {
                    message: errors.array()[0].msg,
                    oldInfo: req.body
                })
            }

            models.User.create({ username, password }).then((registeredUser) => {
                if (!arePasswordsEqual) {
                    throw new Error('Password and repeatpassword must be equal!');
                }

                const token = jwt.createToken({ id: registeredUser._id });

                res
                    .cookie(config.cookie, token)
                    .redirect('/home/');
            }).catch((error) => {
                res.render('registerPage.hbs', {
                    message: error.message,
                    oldInfo: req.body
                })
            })
        }
    }
};