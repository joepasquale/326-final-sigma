const router = require("express").Router();
import { List } from '../models/booklist';
import { User } from '../models/user';
import { Book } from '../models/book';




router.post('/add', async (req, res) => {
    const bookUpdate = await Book.findOneAndUpdate(
        { user: req.body.User, book: req.body.Book },
        { $set: { status: req.body.List } },
        { upsert: true, new: true });
    await User.findOneAndUpdate(
        { _id: req.body.User },
        { $push: { booklist: bookUpdate } });
});

router.post('/update', async (req, res) => {
    const bookUpdate = await Book.findOneAndUpdate(
        { user: req.body.User, book: req.body.Book },
        { $set: { status: req.body.List } },
        { upsert: true, new: true });
});

router.post('/remove', async (req, res) => {
    const bookUpdate = await Book.findOneAndRemove(
        {user: req.body.User, book: req.body.Book }
    );
    await User.findOneAndRemove(
        { _id: req.body.User },
        { $pull: { booklist: bookUpdate } }
    );
});

router.post('/find', async (req, res) => { //REVISIT
    //await User.findOne;
    //{user:req.body.User, bookList : req.body.book}

});



export { router };