const express = require('express');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

try {
    mongoose.connect(
        process.env.DB_CONNECTION ,
         { useUnifiedTopology: true, useNewUrlParser: true }, 
         () =>
         console.log('connected to db, state: '+ mongoose.connection.readyState)         );
} catch (error) {
    console.log(error);
}


app.get('/', (req, res) => {
    const request = req.body.message;
    res.json('Hello, your message is '+ request);
})

app.listen(3000);