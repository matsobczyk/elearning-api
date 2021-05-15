const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    const token =  req.header('auth-token');
    if(!token) return res.status(400).send('Acces Denied!');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid auth token');
    }
}


const authTeacher = (req, res, next) => {
    const token =  req.header('auth-token');
    if(!token) return res.status(400).send('Acces Denied!');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRETTeacher);
        req.teacher = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid auth token');
    }
}

module.exports.authUser = authUser;
module.exports.authTeacher = authTeacher;