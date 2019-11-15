const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, Number, Boolean, ObjectId, Date } = Schema.Types;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,  
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    users: [{
        type: ObjectId,
        ref: 'User'
    }],
    creator: {
        type: ObjectId,
        required: true
    }
});

module.exports = new Model('Course', courseSchema);
