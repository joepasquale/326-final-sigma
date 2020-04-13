const express = require("express");
const mongoose = require("mongoose");
const login = require("./routes/login");
const app = express();

app.use(express.json());
app.use('/api/login', login);

mongoose.connect('mongodb://localhost:27017/shelf', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB..',err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));