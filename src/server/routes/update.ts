const router = require("express").Router();
import {Friend} from '../models/friends'
import { Update } from '../models/update';


router.post('/all', async (req, res) => {
    let updates = await Update.find({
        'user': {$in: req.body.array}
    })
    .populate('user', '_id username email')
    .populate('book', 'title imageLinks')
    .sort({'time': -1});
    res.json(updates);
});




export { router };