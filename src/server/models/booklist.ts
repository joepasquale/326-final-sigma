const mongoose = require('mongoose');


const listSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
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


let Booklist = mongoose.model('Booklist', listSchema);

export { Booklist };