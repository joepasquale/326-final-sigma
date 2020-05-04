"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: [{ type: String }],
    publisher: { type: String },
    publishedDate: { type: String },
    categories: [{ type: String }],
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
        thumbnail: { type: String }
    },
    userReview: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Review'
        }]
});
var Book = mongoose.model('Book', bookSchema);
exports.Book = Book;
