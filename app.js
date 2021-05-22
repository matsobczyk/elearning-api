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
const answersRoute = require('./routes/answer');
app.use('/answer', answersRoute);

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
const testRoute = require('./routes/test');
app.use('/auth', authRoute);
app.use('/teacher', teacherRoute);
app.use('/test', testRoute);

app.get('/', (req, res) => {
    const request = req.body.message;
    res.json('Hello, your message is '+ request);
})

app.get('/user', auth.authAny, (req, res) => {
    if(!req.teacher){
        res.json(req.user);
    }else{
        res.json(req.teacher);
    }
    
})

app.listen(3000);