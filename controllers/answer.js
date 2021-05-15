const Answer = require("../models/Answer")

exports.getAnswers = async (req, res) => {
    const answers = await Answer.find().exec();
    res.send(answers);
}
exports.getAnswer = async (req, res) => {
    const answer = await Answer.findById(req.params.answerId);
    res.send(answer);
}
exports.createAnswer = async (req, res) => {
    const answer = new Answer ({
        author : req.body.author,
        answers  : req.body.answers
    });
    try {
        const savedAnswer = await answer.save();
        res.json(savedAnswer);
    } catch (error) {
        res.json(error.message);
    }

}
//TODO: fix, returns empty object
exports.updateAnswer = async (req, res) => {
    try{
        const updatedAnswer = await Anser.updateOne(
            {id: req.params.answerId}, 
            {$set: {answers: req.body.answers}}
            );
        res.json(updatedAnswer);
    }catch(err){
        res.json(err);
    }
}
//TODO: 
exports.deleteAnswer = async (req, res) => {
    res.json('deleteAnswers')
}