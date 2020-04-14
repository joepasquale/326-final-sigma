const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    requester: {type: Schema.Types.ObjectId, ref: 'User'},
    reciever: {type: Schema.Types.ObjectId, ref: 'User'},
    status: {
        type: Number,
        enums: [
            1,  //requested
            2,  //pending
            3,  //friends
        ]
    }
});


var Friend = mongoose.model('Friend', friendsSchema);

module.exports = Friend;