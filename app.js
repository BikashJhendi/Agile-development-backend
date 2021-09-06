const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const path = require('path');
const bodyparser = require('body-parser')
const port = process.env.PORT || 90;


app.use(cors());
app.use(express.json());

//getting database
const db = require('./database/database.js');

app.get("/", function (req, res) {
    res.send("API is Working!!!");
})

//routes
const userRoute = require('./routes/userRoute');
const gadgetRoute = require('./routes/gadgetRoute');
const cosmeticRoute = require('./routes/cosmeticRoute');
const landingad = require('./routes/landingad');
const gadgetCartRoute = require('./routes/myCartRoute');
const questionRoute = require('./routes/questionRoute');
const productReviewRoute = require('./routes/productReviewRoute');
const productRequest = require('./routes/productRequestRoute');

// view engine set for hbs
app.set("view engine", "hbs");

//app.use
app.use(userRoute);
app.use(gadgetRoute);
app.use(cosmeticRoute);
app.use(gadgetCartRoute);
app.use(questionRoute);
app.use(productReviewRoute);
app.use(productRequest);
app.use(landingad);

//Images
app.use(express.static(path.join(__dirname, "assets/image/")));
app.use(bodyparser.urlencoded({ extended: false }));
// app.use(express.urlencoded({
//     urlencoded: true,
//     extended: false,
// }))

//listen
app.listen(port, () => {
    console.log(`Server is running on PORT: ${port} :)`);
});

module.exports = app;