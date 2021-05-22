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
        author : req.user,
        testId: req.body.testId,
        answers  : req.body.answers
    });
    try {
        const savedAnswer = await answer.save();
        res.json(savedAnswer);
    } catch (error) {
        res.json(error.message);
    }

}
//TODO: update author, req.user returns null
exports.updateAnswer = async (req, res) => {
    try{
        const updatedAnswer = await Answer.findByIdAndUpdate(
            req.params.answerId, 
            {$set: {answers: req.body.answers, date: Date.now()}}
            );
        res.json(updatedAnswer);
    }catch(err){
        res.json(err);
    }
}
//TODO: 
exports.deleteAnswer = async (req, res) => {
    try{
        const deletedAnswer = await Answer.findByIdAndDelete(req.params.answerId);
        res.json(deletedAnswer);
    }catch(err){
        res.json(err);
    }
}