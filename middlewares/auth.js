const jwt = require('jsonwebtoken');

const authAny = (req, res, next) => {
    const token =  req.header('auth-token');
    if(!token) return res.status(400).send('Acces Denied!');
    var authenticated = 0
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
        req.user = verified;
        next();
    }catch(err){
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRETTeacher);
            console.log(verified);
            req.teacher = verified;
            next();
            authenticated = 1;
            } catch (error) {
                res.status(400).send('Invalid auth token');
            }
        if (authenticated == 0){
            res.status(400).send('Invalid auth token');
        }
    }
}

const authUser = (req, res, next) => {
    const token =  req.header('auth-token');
    if(!token) return res.status(400).send('Acces Denied!');

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified);
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
module.exports.authAny = authAny;
