const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

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



//listen
app.listen(90);