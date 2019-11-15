const dealerModel = require('../models/dealer');

function getDealers(req, res) {
    res.render('dealers.hbs', {}); // to fix
}

module.exports = {
    getDealers
}
