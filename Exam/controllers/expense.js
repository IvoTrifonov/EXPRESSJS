const models = require('../models');
const config = require('../config/config');
const { validationResult } = require('express-validator');

module.exports = {
    get: {
        create: (req, res, next) => {
            const hbsObject = {
                pageTitle: 'Create Expense',
                isLoggedIn: req.cookies[config.cookie] !== undefined, 
                username: req.user ? req.user.username : undefined,
            };

            res.render('createExpense.hbs', hbsObject);
        },
        edit: (req, res, next) => {
            const { expenseId } = req.params;

            models.Expense.findById(expenseId).then((expense) => {
                const hbsObject = {
                    expense,
                    pageTitle: 'Expense Edit',
                    isLoggedIn: req.cookies[config.cookie] !== undefined, 
                    username: req.user ? req.user.username : undefined,
                };
                
                res.render('reportExpense.hbs', hbsObject);
            }).catch(console.log);
        },
        delete: (req, res, next) => {
            const { expenseId } = req.params;

            models.Expense.findByIdAndRemove(expenseId).then((removedExpense) => {
                res.redirect('/home/');
            });
        }
    },
    post: {
        create: (req, res, next) => {
            const { merchant, total, category, description, report } = req.body;
            const date = new Date();
            const isReport = report === 'on';
          

            // const errors = validationResult(req);
           
            // if (!errors.isEmpty()) {
            //     return res.render('createCoursePage.hbs', {
            //         message: errors.array()[0].msg,
            //         oldInput: req.body
            //     })
            // }

            models.Expense.create({
                merchant, 
                date,
                total, 
                category, 
                description,
                report: isReport, 
                user: req.user.id
            }).then((createdCourse) => {
                res.redirect('/home/')
            });
        },
    }
}