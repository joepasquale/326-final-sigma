const router = require("express").Router();
import { Friend } from '../models/friends';
import { User } from '../models/user';


router.post('/request', async (req, res) => {
    const relationshipA =  await Friend.findOneAndUpdate(
        { requester: req.body.UserA, reciever: req.body.UserB },
        { $set: { status: 1 } },
        { upsert: true, new: true }
    );
    const relationshipB = await Friend.findOneAndUpdate(
        { requester: req.body.UserB, reciever: req.body.UserA },
        { $set: { status: 2 } },
        { upsert: true, new: true }
    );
    await User.findOneAndUpdate(
        { _id: req.body.UserA },
        { $push: { friends: relationshipA } }
    )
    await User.findOneAndUpdate(
        { _id: req.body.UserB },
        { $push: { friends: relationshipB } }
    )
});

router.post('/accept', async (req, res) => {
    Friend.findOneAndUpdate(
        { requester: req.body.UserA, receiver: req.body.UserB },
        { $set: { status: 3 } }
    )
    Friend.findOneAndUpdate(
        { requester: req.body.UserB, receiver: req.body.A },
        { $set: { status: 3 } }
    )
});

router.post('/reject', async (req, res) => {
    const relationshipA = await Friend.findOneAndRemove(
        { requester: req.body.UserA, receiver: req.body.UserB }
    );
    const relationshipB = await Friend.findOneAndRemove(
        { requester: req.body.UserB, reciever: req.body.UserA },
    );
    await User.findOneAndUpdate(
        { _id: req.body.UserA },
        { $pull: { friends: relationshipA._id } }
    )
    await User.findOneAndUpdate(
        { _id: req.body.UserB },
        { $pull: { friends: relationshipB._id } }
    )
});

router.post('/find', async (req, res) => {

});


export { router };