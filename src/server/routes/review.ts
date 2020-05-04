const router = require("express").Router();
import { Book as bookSchema} from '../models/book';
import {User as userSchema} from '../models/user';
import {Review} from '../models/review';


router.post('/add', async (req, res) => {
    let review = new Review({
        user: req.body.User,
        book: req.body.Book,
        message: req.body.Text,
        rating: req.body.Rating
    });
    await review.save();
    await bookSchema.findOneAndUpdate(
        { _id: req.body.Book },
        { $push: { userReview: review } }
    )
    await userSchema.findOneAndUpdate(
        { _id: req.body.User },
        { $push: { reviews: review } }
    )
    res.end();
});

router.post('/find_books', async (req, res) => {
    const reviews = await Review.find(
        { book: req.body.Book },
    )
    .populate('user', 'username _id')
    res.json(reviews);
});

export {router};