const router = require("express").Router();
import { User } from '../models/user';
import { Book } from '../models/book';
import { Update } from '../models/update';

async function updateAdd(req, res, next){
    let update = new Update({
        user: req.body.User,
        book: req.body.Book,
        status:{
            toList: req.body.Update,
            fromList: req.body.Update
        }
    });
 await update.save();
 next();
};

export { updateAdd };