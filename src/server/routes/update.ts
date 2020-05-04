const router = require("express").Router();
import { User as UserSchema } from '../models/user';
import {Friend} from '../models/friends'
import { Book } from '../models/book';
import { Update } from '../models/update';


router.post('/all', async (req, res) => {
    console.log(req.body.User);
    const friendslist = await Friend.find(
        {'requester': req.body.User},
    )
    .populate({
        path:'receiver',
        populate:{
            path: 'updates'
        }
    });
    res.json(friendslist);
});

export { router };