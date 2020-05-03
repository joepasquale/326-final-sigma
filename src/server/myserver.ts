const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();


import { router as login } from "./routes/login";
import { router as user } from "./routes/user";
import { router as book } from "./routes/book";
import { router as friends } from "./routes/friends";
import { router as booklist } from "./routes/booklist";
import { router as updates } from "./routes/update";

app.use(express.json());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB..', err));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

app.use('/resources', express.static('../public/resources'));
app.use('/css', express.static('../public/css'));
app.use('/javascript', express.static('../public/javascript'));
app.use('/', express.static('../public/html'));
app.use('/auth', express.static('../public/authhtml'));
app.use('/api/login', login);
app.use('/api/user', user);
app.use('/api/book', book);
app.use('/api/booklist', booklist);
app.use('/api/friend', friends);
app.use('/api/updates', updates);

