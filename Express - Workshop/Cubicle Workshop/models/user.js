const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be at least 5 chars!'],
        validate: [
            {
                validator: (value) => {
                    return /[a-zA-Z0-9]+/.test(value); 
                },
                message: props => `${props.value} is not a valid username!`
            }
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should be at least 8 letters!'],
        validate: [
            {
                validator: (value) => {
                    return /[a-zA-Z0-9]+/.test(value); 
                },
                message: props => `Password is not valid!`
            }
        ]
    }
});

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) { next(err); return; }
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return; }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
    
