const router = require("express").Router();
const path = require('path');

router.get('/login', async (req, res) => {
    res.sendFile(path.resolve('../public/login'));
});

router.get('/login/register', async (req, res) => {

});

router.get('user/friends', async (req, res) => {

});


router.get('user/profile', async (req, res) => {

});


router.get('/search', async (req, res) => {

});


router.get('/user/reading', async (req, res) => {

});

router.get('/book', async (req, res) => {

});

router.get('/home', async (req, res) => {

});

router.get('/book/add', async (req, res) => {

});


export { router }