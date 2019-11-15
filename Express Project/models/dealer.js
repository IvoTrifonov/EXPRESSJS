const mongose = require('mongoose');

const dealerSchema = new mongose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String }
});

module.exports = mongose.model('Dealer', dealerSchema);

