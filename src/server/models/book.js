"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        thumbnail: { type: String },
    },
    userRating: [{
            username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number },
        }],
    userReview: [{
            username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            time: { type: Date },
            text: { type: String }
        }]
});
var Book = mongoose.model('Book', bookSchema);
exports.Book = Book;
//# sourceMappingURL=book.js.map