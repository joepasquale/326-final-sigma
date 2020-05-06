const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();

import {auth} from "./middleware/auth";
import { router as login } from "./routes/login";
import { router as user } from "./routes/user";
import { router as book } from "./routes/book";
import { router as friends } from "./routes/friends";
import { router as booklist } from "./routes/booklist";
import { router as updates } from "./routes/update";
import { router as review } from "./routes/review";

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.DB || 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false', { useNewUrlParser: true })
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
app.use('/api/user', auth,  user);
app.use('/api/book', auth, book);
app.use('/api/booklist', auth, booklist);
app.use('/api/friend', auth, friends);
app.use('/api/updates', auth, updates);
app.use('/api/review', auth, review);


