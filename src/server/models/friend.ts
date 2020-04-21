const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    requester: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    reciever: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    status: {
        type: Number,
        enums: [
            1,  //requested
            2,  //pending
            3,  //friends
        ]
    }
});


let Friend = mongoose.model('Friend', friendsSchema);

export { Friend };