const config = require('./config');
const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);

module.exports = () => {
  return mongoose.connect(config.dbURL, { useNewUrlParser: true });
};