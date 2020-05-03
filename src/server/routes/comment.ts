const router = require("express").Router();
import { User } from '../models/user';
import { Update } from '../models/update';
import { Comment } from '../models/comment';

router.post('/add', async (req, res) => {
    let comment = new Comment({
        user: req.body.User,
        update: req.body.Update,
        time : req.body.Comment,
        message: req.body.Comment
    });
 await comment.save();
});

export { router };