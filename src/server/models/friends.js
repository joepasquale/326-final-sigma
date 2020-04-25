"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var friendsSchema = new mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
