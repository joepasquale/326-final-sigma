const router = require("express").Router();
import { User } from '../models/user';
import { Update } from '../models/update';

async function updateAdd(req, res, next){
    let update = new Update({
        user: req.body.User,
        book: req.body.Book,
        change: req.body.Change
    });
 await update.save();
 next();
};

export { updateAdd };