const express = require("express");
const sign_in = require("./routes/sign_in");
const app = express();

app.use(express.json());
app.use('/api/sign_in', sign_in);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));