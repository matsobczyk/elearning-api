const Test = require("../models/Test")

exports.getTests = async (req, res) => {
    const tests = await Test.find().exec();
    res.send(tests);
}
exports.getTest = async (req, res) => {
    const test = await Test.findById(req.params.testId);
    res.send(test);
}
exports.createTest = async (req, res) => {
    const test = new Test ({
        author : req.teacher,
        name: req.body.name,
        questions  : req.body.questions
    });
    try {
        const savedTest = await test.save();
        res.json(savedTest);
    } catch (error) {
        res.json(error.message);
    }

}
//TODO: update author, req.user returns null
exports.updateTest = async (req, res) => {
    try{
        const updatedTest = await Test.findByIdAndUpdate(
            req.params.testId, 
            {$set: {questions: req.body.questions, date: Date.now()}}
            );
        res.json(updatedTest);
    }catch(err){
        res.json(err);
    }
}
//TODO: 
exports.deleteTest = async (req, res) => {
    try{
        const deletedTest = await Test.findByIdAndDelete(req.params.testId);
        res.json(deletedTest);
    }catch(err){
        res.json(err);
    }
}