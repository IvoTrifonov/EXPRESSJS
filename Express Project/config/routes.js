const carController = require('../controllers/car');
const dealerController = require('../controllers/dealer');

module.exports = (app) => {
    app.get('/create', carController.getAddCar);
    app.post('/create', carController.postAddCar);

    app.get('/dealers', dealerController.getDealers);
    app.get('/', carController.index);
}