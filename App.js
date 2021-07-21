const express = require('express');
const cors = require('cors');
const app = express();

const path = require('path');
const bodyparser = require('body-parser')

//getting database
const db = require('./Database/database.js');

//routes
const userRoute = require('./routes/userRoute');
const gadgetRoute = require('./routes/gadgetRoute');
const cosmeticRoute = require('./routes/cosmeticRoute');

//app.use
app.use(userRoute);
app.use(gadgetRoute);
app.use(cosmeticRoute);
app.use(cors());
app.use(express.json());

//Images
app.use(express.static(path.join(__dirname, "")));
app.use(bodyparser.urlencoded({ extended: false }));


//listen
app.listen(90);

module.exports = app;