const router = require("express").Router();
import { Booklist } from '../models/booklist';
import { User as UserSchema } from '../models/user';
import { Book } from '../models/book';




router.post('/add', async (req, res) => {
    const relationship = await Booklist.findOneAndUpdate(
        { user: req.body.User, book: req.body.Book },
        { $set: { status: req.body.Status } },
        { upsert: true, new: true });
    await UserSchema.findOneAndUpdate(
        { _id: req.body.User },
        { $addToSet: { booklist: relationship } });
});

router.post('/remove', async (req, res) => {
    const relationship = await Booklist.findOneAndRemove(
        {user: req.body.User, book: req.body.Book }
    );
    await UserSchema.findOneAndUpdate(
        { _id: req.body.User },
        { $pull: { booklist: relationship } }
    );
});

router.post('/find', async (req, res) => {
    let relationship  = await Booklist.findOne(
        {user:req.body.User, book : req.body.Book}
    );
    res.json(relationship);

});

router.post('/all', async (req, res) => {
    let booklist = req.body.array;
    let docfriends = await Booklist.find(
        { '_id': { $in: booklist } })
        .populate('book', '_id title authors imageLinks categories googleRating');
    res.json(docfriends);
});

export { router };