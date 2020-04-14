const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');



router.post('/register', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Email already in use");
    user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("Username already in use");
    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(
        {
         _id:user_id,
        username: user.username,
        email: user.email
    });

});

router.post('/', async (req, res) => {
    user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("Invalid username of password");
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid username of password");
    const token = user.generateAuthToken();
    res.send(token);
});




module.exports = router;