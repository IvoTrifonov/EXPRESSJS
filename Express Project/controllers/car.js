const carModel = require('../models/car');

function index(req, res) {
    carModel.find().then(cars => {
        res.render('index.hbs', { cars });
    });
}

function getAddCar(req, res) {
    res.render('addCar.hbs');
}

function postAddCar(req, res) {
    const { 
        imageUrl,
        manufacturer,
        model, 
        year, 
        fuelType, 
        cubicCapacity, 
        horsePower, 
        description, 
        mileage
    } = req.body;

    carModel.create({ 
        imageUrl,
        manufacturer,
        model, 
        year, 
        engine: {
            fuelType, 
            cubicCapacity, 
            horsePower, 
        },
        description, 
        mileage
    }).then(car => {
        index(req, res);
    })
    
}

module.exports = {
    index,
    getAddCar,
    postAddCar
}