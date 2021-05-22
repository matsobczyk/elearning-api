const mongoose = require('mongoose');

const Questions = new mongoose.Schema({
    question: { 
        type: String,
        required: true
    },
    availableAnswers: {
        type: [String],
        required: true
    },
    rightAnswer: {
        type: Number,
        required: true
    },
});

const Test = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    questions: {
        type: [Questions],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Test", Test);