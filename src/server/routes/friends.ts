const router = require("express").Router();
import { Friend } from '../models/friends';
import { User } from '../models/user';


router.post('/request', async (req, res) => {
    const relationshipA =  await Friend.findOneAndUpdate(
        { requester: req.body.UserA, receiver: req.body.UserB },
        { $set: { status: 1 } },
        { upsert: true, new: true }
    );
    const relationshipB = await Friend.findOneAndUpdate(
        { requester: req.body.UserB, receiver: req.body.UserA },
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
    res.status(200).send("request made");
});

router.post('/accept', async (req, res) => {
    await Friend.findOneAndUpdate(
        { requester: req.body.UserA, receiver: req.body.UserB },
        { $set: { status: 3 } }
    )
    await Friend.findOneAndUpdate(
        { requester: req.body.UserB, receiver: req.body.UserA },
        { $set: { status: 3 } }
    )
    res.status(200).send("friend added");
});

router.post('/reject', async (req, res) => {
    const relationshipA = await Friend.findOneAndRemove(
        { requester: req.body.UserA, receiver: req.body.UserB }
    );
    const relationshipB = await Friend.findOneAndRemove(
        { requester: req.body.UserB, receiver: req.body.UserA },
    );
    await User.findOneAndUpdate(
        { _id: req.body.UserA },
        { $pull: { friends: relationshipA._id } }
    )
    await User.findOneAndUpdate(
        { _id: req.body.UserB },
        { $pull: { friends: relationshipB._id } }
    )
    res.status(200).send("friend reject");
});

router.post('/all', async (req, res) => {
    let friendslist = req.body.array;
    let docfriends = await Friend.find(
        { '_id': { $in: friendslist } })
        .populate('receiver', '_id username email info')
        .populate('requester', '_id username email info');
    res.json(docfriends);
});

router.post('/find', async (req, res) => {
    let relationship = await Friend.findOne(
        {requester: req.body.UserA , receiver: req.body.UserB}
    );
    if(!relationship){
        relationship = await Friend.findOne(
            {requester: req.body.UserB , receiver: req.body.UserA}
        );
    }
   res.json(relationship);
});

export { router };