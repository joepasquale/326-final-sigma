const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    time : { type : Date, default: Date.now },
    toList : { type: Number,
        enums: [
            0,  // None
            1,  // Want to read 
            2,  // Currently reading
            3,  // Completed reading
            4,  // Stopped reading
        ] },
    fromList : { type: Number,
        enums: [
            0,  // None
            1,  // Want to read 
            2,  // Currently reading
            3,  // Completed reading
            4,  // Stopped reading
        ] }
});


let Update = mongoose.model('Update', updateSchema);

export { Update };