const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();

import { router as login } from "./routes/login";
import { router as search } from "./routes/search";
import { router as profile } from "./routes/profile";
import { router as book } from "./routes/book";


app.use(express.json());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/shelf', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB..', err));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));

app.use('/files', express.static('../public'));
app.use('/api/login', login);
app.use('/api/search', search);
app.use('/api/user', profile);
app.use('/api/book', book);
