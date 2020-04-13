const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const User = require('../models/user');


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

    await user.save();

    res.send(user);

});



module.exports = router;