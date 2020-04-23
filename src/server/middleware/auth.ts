const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No Token Provided.');
    try {
        const jwtDecoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = jwtDecoded;
        console.log(req.user)
        next();
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}

export { auth };