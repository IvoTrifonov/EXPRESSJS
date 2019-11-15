const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.engine('hbs', handlebars({
        layoutsDir: 'views',
        defaultLayout: 'main-layout',
        partialsDir: 'views/partials',
        extname: 'hbs'
    }));

    app.set('view engine', 'hbs');

    app.use(express.static('./static'));

    app.use(cookieParser());

    // app.use(bodyParser.urlencoded({ extended: true }));
};