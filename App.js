const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const path = require('path');
const bodyparser = require('body-parser')

//getting database
const db = require('./Database/database.js');

app.use(cors());
app.use(express.json());

//routes
const userRoute = require('./routes/userRoute');
const gadgetRoute = require('./routes/gadgetRoute');
const cosmeticRoute = require('./routes/cosmeticRoute');
const gadgetCartRoute = require('./routes/myCartRoute');

// view engine set for hbs
app.set("view engine", "hbs");


//app.use
app.use(userRoute);
app.use(gadgetRoute);
app.use(cosmeticRoute);
app.use(gadgetCartRoute);


//Images
app.use(express.static(path.join(__dirname, "assets/image/")));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.urlencoded({
    urlencoded: true,
    extended: false,
}))

const port = process.env.PORT || 90;

//listen
app.listen(port, () => {
    console.log("Server running on PORT: " + port + " :)");
});

module.exports = app;