const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    mongoose.set('useUnifiedTopology', true);
    return mongoose.connect(config.dbURL, { useNewUrlParser: true });
}