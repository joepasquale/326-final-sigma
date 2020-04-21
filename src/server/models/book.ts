const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {type: String, required:true},
    authors: [{ type: String }],
    publisher: { type: String },
    publishedDate: { type: String },
    ISBN: [{
        type: { type: String },
        identifier: {
            type: String
        }
    }],
    description: { type: String },
    googleRating: { type: Number },
    imageLinks: {
        smallThumbnail: { type: String },
        thumbnail: { type: String },
    },
    userRating: [{
        username: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number },
    }],
    userReview: [{
        username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        time: { type: Date },
        text: { type: String }
    }]

});



let Book = mongoose.model('Book', bookSchema);

export { Book };