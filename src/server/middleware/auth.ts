const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No Token Provided.');
    console.log("auth Called");
    try {
        const jwtDecoded = jwt.verify(token, process.env.jwtPrivateKey || 'jwtPrivateKey');
        req.user = jwtDecoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}

export { auth };