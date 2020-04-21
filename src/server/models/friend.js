"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var friendsSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: Number,
        enums: [
            1,
            2,
            3,
        ]
    }
});
var Friend = mongoose.model('Friend', friendsSchema);
exports.Friend = Friend;
//# sourceMappingURL=friend.js.map