const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    requester: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    reciever: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    status: {
        type: Number,
        enums: [
            1,  // Want to read 
            2,  // Currently reading
            3,  // Completed reading
            4,  // Stopped reading
        ]
    }
});


let List = mongoose.model('List', listSchema);

export { List };