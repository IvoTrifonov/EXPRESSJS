const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const expenseSchema = new Schema({
    merchant: {
        type: String,
        required: true
    },
    date: {
        type: Date,
    },
    total: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    report: {
        type: Boolean,  
        required: true,
        
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = new Model('Expense', expenseSchema);
