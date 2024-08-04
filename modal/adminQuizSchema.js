const mongoose = require("mongoose")

const adminQuizSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    maxMarks: {
        type: Number,
        required: true
    },
    numberOfQuestions: {
        type: Number,
        required: true
    },
    publish: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    }
})

const adminsQuiz = mongoose.model("adminquizzes", adminQuizSchema)

module.exports = adminsQuiz