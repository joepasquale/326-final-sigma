"use strict";
exports.__esModule = true;
var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    update: { type: mongoose.Schema.Types.ObjectId, ref: 'Update' },
    time: { type: Date, "default": Date.now },
    message: { type: String, "default": "" }
});
var Comment = mongoose.model('Comment', commentSchema);
exports.Comment = Comment;
