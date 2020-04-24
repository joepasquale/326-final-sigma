const bcrypt = require('bcrypt');
const router = require("express").Router();
import { User } from '../models/user';


router.post('/register', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already in use");
    user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("Username already in use");
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        info:{
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            favorite_book: "",
            favorite_genre: "None"
        },
        friends: [],
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = await user.generateAuthToken();
    res.send(token);

});

router.post('/', async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send("Invalid username of password");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid username of password");
    const token = await user.generateAuthToken();
    res.send(token);
});



export { router };