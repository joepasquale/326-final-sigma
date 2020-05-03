"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var listSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    status: {
        type: Number,
        enums: [
            1,
            2,
            3,
            4,
        ]
    }
});
var Booklist = mongoose.model('Booklist', listSchema);
exports.Booklist = Booklist;
