"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var app = express();
var login_1 = require("./routes/login");
var search_1 = require("./routes/search");
var profile_1 = require("./routes/profile");
var book_1 = require("./routes/book");
var html_1 = require("./routes/html");
app.use(express.json());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/shelf', { useNewUrlParser: true })
    .then(function () { return console.log('Connected to MongoDB...'); })
    .catch(function (err) { return console.error('Could not connect to MongoDB..', err); });
var PORT = process.env.PORT || 4000;


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(PORT, function () { return console.log("Server listening on " + PORT); });
app.use('/resources', express.static('../public/resources'));
app.use('/css', express.static('../public/css'));
app.use('/javascript', express.static('../public/javascript'));
app.use('/', express.static('../public/html'));
//app.use('/auth', auth);
app.use('/', html_1.router);
app.use('/api/', search_1.router);
app.use('/auth', express.static('../public/authhtml'));
app.use('/api/login', login_1.router);
app.use('/api/user', profile_1.router);
app.use('/api/book', book_1.router);
//# sourceMappingURL=myserver.js.map