const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const path = require('path');
const bodyparser = require('body-parser')

//getting database
const db = require('./Database/database.js');

//routes
const userRoute = require('./routes/userRoute');
const gadgetRoute = require('./routes/gadgetRoute');
const cosmeticRoute = require('./routes/cosmeticRoute');
const gadgetCartRoute = require('./routes/myCartRoute');

// view engine set
app.set("view engine", "hbs");

//app.use
app.use(userRoute);
app.use(gadgetRoute);
app.use(cosmeticRoute);
app.use(gadgetCartRoute);


//Images
app.use(express.static(path.join(__dirname, "assets/image/")));
app.use(bodyparser.urlencoded({ extended: false }));


//listen
app.listen(90, () => {
    console.log("Server running...");
});

module.exports = app;