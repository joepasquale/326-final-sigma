"use strict";
exports.__esModule = true;
var jwt = require('jsonwebtoken');
function auth(req, res, next) {
    var token = req.header('x-auth-token');
    if (!token)
        return res.status(401).send('No Token Provided.');
    try {
        var jwtDecoded = jwt.verify(token, 'jwtPrivateKey');
        req.user = jwtDecoded;
        next();
    }
    catch (err) {
        res.status(400).send('Invalid Token');
    }
}
exports.auth = auth;
