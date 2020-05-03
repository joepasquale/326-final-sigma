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
    },
    info: {
        firstname: { type: String },
        lastname: { type: String },
        favorite_book: {type: String},
        favorite_genre: {type: String}
    },
    booklist: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'List'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Friend'
    }],
    Updates: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Update'
    }]
});

userSchema.index({ username: 'text' });

userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({ _id: this._id, username: this.username }, 'jwtPrivateKey', { expiresIn: '1h' });
    return token;
}

let User = mongoose.model('User', userSchema);

export { User };