const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    quizId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
});

const QuizResult = mongoose.model('quizresults', quizResultSchema);

module.exports = QuizResult;
