const config = require('../config/config');
const models = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {
            models.Course.find({ isPublic: true }).then((courses) => {
                const hbsObject = {
                    pageTitle: 'Home Page',
                    isLoggedIn: req.cookies[config.cookie] !== undefined,
                    username: req.user ? req.user.username : undefined,
                    courses
                };
    
                res.render('homePage.hbs', hbsObject);
            });
        }
    },
};