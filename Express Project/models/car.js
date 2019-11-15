const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: { type: Number }, // TO FIX
    engine: {
        fuelType: { type: String, required: true },
        cubicCapacity: { type: Number },
        horsePower: { type: Number },
    },
    description: { type: String },
    mileage: { type: Number }
});

module.exports = mongoose.model('Car', carSchema);
