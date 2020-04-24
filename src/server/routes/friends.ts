const router = require("express").Router();
import { Friend } from '../models/friends';
import { User } from '../models/user';


router.post('/request', async (req, res) => {
    const relationshipA =  await Friend.findOneandUpdate(
        { requester: req.body.UserA, recipient: req.body.UserB },
        { $set: { status: 1 } },
        { upsert: true, new: true }
    );
    const relationshipB = await Friend.findOneandUpdate(
        { requester: req.body.UserB, recipient: req.body.UserA },
        { $set: { status: 2 } },
        { upsert: true, new: true }
    );
    await User.findOneAndUpdate(
        { _id: req.body.UserA },
        { $push: { freinds: relationshipA._id } }
    )
    await User.findOneAndUpdate(
        { _id: req.body.UserB },
        { $push: { freinds: relationshipB._id } }
    )
});

router.post('/accept', async (req, res) => {
    Friend.findOneAndUpdate(
        { requester: req.body.UserA, recipient: req.body.UserB },
        { $set: { status: 3 } }
    )
    Friend.findOneAndUpdate(
        { requester: req.body.UserB, recipient: req.body.A },
        { $set: { status: 3 } }
    )
});

router.post('/reject', async (req, res) => {
    const relationshipA = await Friend.findOneandRemove(
        { requester: req.body.UserA, recipient: req.body.UserB }
    );
    const relationshipB = await Friend.findOneandRemove(
        { requester: req.body.UserB, recipient: req.body.UserA },
    );
    await User.findOneAndUpdate(
        { _id: req.body.UserA },
        { $pull: { freinds: relationshipA._id } }
    )
    await User.findOneAndUpdate(
        { _id: req.body.UserB },
        { $pull: { freinds: relationshipB._id } }
    )
});




export { router };