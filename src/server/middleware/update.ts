const router = require("express").Router();
import { User } from '../models/user';
import { Update } from '../models/update';

async function updateAdd(req, res, next){
    let update = new Update({
        user: req.body.User,
        book: req.body.Book,
        toList: req.body.To,
        fromList: req.body.From
    });
 await update.save();
 await User.findOneAndUpdate(
    { _id: req.body.User },
    { $push: { Updates: update } }
)
 next();
};

export { updateAdd };