"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    time: { type: Date, "default": Date.now },
    rating: { type: Number },
    message: { type: String, "default": "" }
});
var Review = mongoose.model('Review', reviewSchema);
exports.Review = Review;
