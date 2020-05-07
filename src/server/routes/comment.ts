const router = require("express").Router();
import { User } from '../models/user';
import { Update } from '../models/update';
import { Comment } from '../models/comment';

router.post('/add', async (req, res) => {
    let comment = new Comment({
        user: req.body.User,
        update: req.body.Update,
        message: req.body.Comment
    });
    await comment.save();
    res.status(200).send("comment added");
});

router.post('/all', async (req, res) => {
    let comments = await Comment.find(
        { update: req.body.Update }
    )
    .populate('user', '_id username email')
    .sort({'time': 1});
    res.json(comments);
});

router.post('/remove', async (req, res) => {
    let comments = await Comment.findOneAndRemove(
        { _id: req.body.ID }
    )
    res.status(200).send("comment removed");
});





export { router };