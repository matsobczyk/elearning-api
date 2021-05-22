const mongoose = require('mongoose');

const Answers = new mongoose.Schema({
    questionNumber: {
        type: Number,
    },
    answer: {
        type: String,
    }
})

const Answer = new mongoose.Schema({
    author: { 
        type: String,
        required: true
    },
    testId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    answers: {
        type: [Answers],
        required: true
    },
})

module.exports = mongoose.model("Answer", Answer);