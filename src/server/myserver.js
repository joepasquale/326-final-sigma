const express = require("express");
const mongoose = require("mongoose");
const login = require("./routes/login");
const search = require("./routes/search");
const profile = require("./routes/profile");
const book = require("./routes/book");
const bodyParser = require('body-parser')
const app = express();

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


