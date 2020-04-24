const router = require("express").Router();
import { List } from '../models/friends';
import { Book } from '../models/user';




router.post('/add', async (req, res) => {
    const bookUpdate = await.Book.findOneAndUpdate;
        { user:req.body.User, book:req.body.Book},
        { $set: { status: req.body.List } },
        { upsert: true, new: true }

    await User.findOneAndUpdate(
        { _id: req.body.User },
        { $push: { booklist: bookUpdate } }
    )

});

router.post('/update', async (req, res) => {
    

});

router.post('/remove', async (req, res) => {
    

});

router.post('/find', async (req, res) => {
    

});



export { router };