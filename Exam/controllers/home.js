const config = require('../config/config');
const models = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {
            let query = {};
            if (req.user) {
                query = {
                    user: req.user.id
                }
            }

            models.Expense.find(query).then((expenses) => {
                
                const hbsObject = {
                    pageTitle: 'Home Page',
                    isLoggedIn: req.cookies[config.cookie] !== undefined,
                    expenses,
                    username: req.user ? req.user.username : undefined 
                    
                };
    
                res.render('homePage.hbs', hbsObject);
            })
            
            
            
        }
    },
};