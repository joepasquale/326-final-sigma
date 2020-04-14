const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, username: this.username }, 'jwtPrivateKey')
    return token;
}

var User = mongoose.model('User', userSchema);

module.exports = User;