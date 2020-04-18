"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRouter = require('express').router;
var bcrypt = require('bcrypt');
var Login = /** @class */ (function () {
    function Login(db) {
        this.db = db;
        // from https://enable-cors.org/server_expressjs.html
        router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
    }
    return Login;
}());
exports.Login = Login;
//# sourceMappingURL=login.js.map