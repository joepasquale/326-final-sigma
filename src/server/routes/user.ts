const router = require("express").Router();
import { User } from '../models/user';
import { Friend } from '../models/friends';
import { auth } from '../middleware/auth';

router.post('/read', async (req, res) => {
    let id = req.body.id;
    await User.findOne({ _id: id }, { password: 0 })
        .exec(function (err, user) {
            if (err) {
                console.log(err);
                return res.status(400).send("No User Found");
            }
            if (!user) return res.status(400).send("No User Found");
            console.log(user);
            res.json(user);     
        });
});

router.post('/search', async (req, res) => {
    let search = req.body.search;
    if (!search) return res.status(400).send("No profile found");
    await User.find({ $text: { $search: search } }, {password:0} )
        .then(profiles => {
            console.log("profile found or not found");
            if (!profiles || profiles.length === 0) return res.status(400).send("No profiles found");
            res.send(profiles);
    })
        .catch(err => {
            console.log("search error");
            return res.status(400).send("error");
        });

});


router.post('/info/update', async (req, res) => {
    console.log(req.body.info);
    await User.findOneAndUpdate(
        { username: req.body.username },
        { $set: { info: req.body.info } }
    )
    res.status(200).send("user updated");
});

router.post('/me', auth, async (req, res) => {
    res.json(req.user);
});




export { router };