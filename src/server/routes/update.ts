const router = require("express").Router();
import { User } from '../models/user';
import { Book } from '../models/book';
import { Update } from '../models/update';

router.post('/add', async (req, res) => {
    let update = new Update({
        user: req.body.User,
        book: req.body.Book,
        status:{
            toList: req.body.Update,
            fromList: req.body.Update
        }
    });
 await update.save();
});

router.post('/find', async (req, res) => { //REVISIT
    //await User.findOne;


});

export { router };