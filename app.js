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
const auth = require('./middlewares/auth');

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

const teacherRoute = require('./routes/teacher');
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);
app.use('/teacher', teacherRoute);

app.get('/', (req, res) => {
    const request = req.body.message;
    res.json('Hello, your message is '+ request);
})

app.get('/user', auth.authUser, (req, res) => {
    res.json('Hello, your message is User');
})

app.listen(3000);