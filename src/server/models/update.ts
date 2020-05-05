const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    time : { type : Date, default: Date.now },
    change: {type: mongoose.Schema.Types.Mixed}
});


let Update = mongoose.model('Update', updateSchema);

export { Update };