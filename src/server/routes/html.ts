const router = require("express").Router();

router.get('/login', async (req, res) => {
    res.sendFile('login.html');
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