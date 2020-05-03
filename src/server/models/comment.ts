const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    update: {type: mongoose.Schema.Types.ObjectId, ref: 'Update'},
    time : { type : Date, default: Date.now },
    message : { type: String, default: ""}
});


let Comment = mongoose.model('Comment', commentSchema);

export { Comment };