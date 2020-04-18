"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var login_1 = require("./routes/login");
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        this.server = express();
        this.router = express.Router();
        this.db = db;
        //this.login = new Login(db);
        // from https://enable-cors.org/server_expressjs.html
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        this.server.use('/', express.static('../public'));
        this.server.use('/login', login_1.loginRouter);
    }
    MyServer.prototype.listen = function (port) {
        this.server.listen(port, function () { return console.log("Server listening on " + port); });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
//# sourceMappingURL=myserver-routing.js.map