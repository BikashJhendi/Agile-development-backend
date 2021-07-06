const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

//getting database
const db = require('./Database/database.js');

//routes
const userRoute = require('./Routes/userRoute');
//app.use
app.use(userRoute);


//listen
app.listen(3000);