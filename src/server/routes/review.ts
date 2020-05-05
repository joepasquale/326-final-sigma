const router = require("express").Router();
var ObjectId = require('mongoose').Types.ObjectId;
import { Book as bookSchema} from '../models/book';
import {User as userSchema} from '../models/user';
import {Review} from '../models/review';
import { Update } from '../models/update';


router.post('/add', async (req, res) => {
    let review = new Review({
        user: req.body.User,
        book: req.body.Book,
        message: req.body.Text,
        rating: req.body.Rating
    });
    await review.save();

    let update = new Update({
        user: req.body.User,
        book: req.body.Book,
        change: review._id
    });
    await update.save();
    await bookSchema.findOneAndUpdate(
        { _id: req.body.Book },
        { $push: { userReview: review } }
    )
    await userSchema.findOneAndUpdate(
        { _id: req.body.User },
        { $push: { reviews: review,} }
    )
    res.end();
});

router.post('/remove', async (req, res) => {
   await Update.findOneAndRemove(
        {change: new ObjectId(req.body.ID)}
    );
    await Review.findOneAndRemove(
        { _id: req.body.ID}
    );
    await userSchema.findOneAndUpdate(
        { _id: req.body.User },
        { $pull: { reviews: req.body.ID} }
    )
    res.end();
});

router.post('/find_books', async (req, res) => {
    const reviews = await Review.find(
        { book: req.body.Book },
    )
    .populate('user', 'username _id')
    .sort({'time': -1});
    res.json(reviews);
});

export {router};