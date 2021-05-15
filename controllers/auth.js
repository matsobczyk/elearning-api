const User = require('../models/User');
const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../middlewares/validation')
// const mailing = require("../mailer");


//register User
exports.register = (async (req, res) => {
    //data validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //check if email is already in database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already in database!');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        date: req.body.date,
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
        // mailing.send_account_creation_email(user);//sending mail on account creation
    }catch(err){
        res.status(400).send(err);
    }
});

//login User
exports.login = (async (req, res) => {
    //validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if email does not exists
    const user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Email not found');

    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

//register Teacher
exports.registerTeacher = (async (req, res) => {
    //data validation
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //check if email is already in database
    const emailExist = await Teacher.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already in database!');

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const teacher = new Teacher ({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        date: req.body.date,
    });
    try {
        const savedTeacher = await teacher.save();
        res.send({teacher: savedTeacher._id});
        // mailing.send_account_creation_email(teacher);//sending mail on account creation
    }catch(err){
        res.status(400).send(err);
    }
});

//login Teacher
exports.loginTeacher = (async (req, res) => {
    //validation
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if email does not exists
    const teacher = await Teacher.findOne({ email: req.body.email});
    if (!teacher) return res.status(400).send('Email not found');

    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password, teacher.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //create and assign a token
    const token = jwt.sign({_id: teacher._id}, process.env.TOKEN_SECRETTeacher);
    res.header('auth-token', token).send(token);
});