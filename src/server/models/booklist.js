"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var listSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
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