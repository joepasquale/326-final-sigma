const router = require("express").Router();
import { User } from '../models/user';
import {Friend} from '../models/friends'
import { Book } from '../models/book';
import { Update } from '../models/update';


router.post('/all', async (req, res) => {
    let friendslist = req.body.array;
    const friendsUpdates = await Update.find(
        { 'user': { $in: friendslist } })
        .populate('user', '_id username email info updates')
        .populate('book', '_id title authors imageLinks categories googleRating')
        .sort({ 'time' : 'descending'});
    res.json(friendsUpdates);
});

export { router };