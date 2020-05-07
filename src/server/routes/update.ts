const router = require("express").Router();
import {Friend} from '../models/friends'
import { Update } from '../models/update';


router.post('/all', async (req, res) => {
    
    const friendslist = await Friend.find(
        {'requester': req.body.User, 'status': 3},
    );
    let friendid = [];
    friendslist.forEach(async (element) => {friendid.push(element.receiver)});
    let updates = await Update.find({
        'user': {$in: friendid}
    })
    .populate('user', '_id username email')
    .populate('book', 'title imageLinks')
    .sort({'time': -1});
    console.log(updates);
    res.json(updates);
});

export { router };