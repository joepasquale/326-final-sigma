"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var List = mongoose.model('List', listSchema);
exports.List = List;
//# sourceMappingURL=booklist.js.map