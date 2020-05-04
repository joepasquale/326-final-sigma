const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'Book'},
    time : { type : Date, default: Date.now },
    rating: {type: Number},
    message : { type: String, default: ""}
});


let Review = mongoose.model('Review', reviewSchema);

export { Review };