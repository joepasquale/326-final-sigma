"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var updateSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    time: { type: Date, "default": Date.now },
    toList: { type: Number,
        enums: [
            0,
            1,
            2,
            3,
            4,
        ] },
    fromList: { type: Number,
        enums: [
            0,
            1,
            2,
            3,
            4,
        ] }
});
var Update = mongoose.model('Update', updateSchema);
exports.Update = Update;
