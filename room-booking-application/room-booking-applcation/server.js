require ('dotenv').config();
const bodyparser = require('body-parser');
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db.js')

const app = express()
connectDB();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.set('view engine','ejs');
app.set('views','views'); 

const users = require('./routes/loginSignupRoutes.js');
const application = require('./routes/applicationRoutes.js');

app.use(express.json())
app.use(cors())
app.use('/',users);
app.use('/',application);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
{   
    console.log(`listening on ${PORT}`);
});