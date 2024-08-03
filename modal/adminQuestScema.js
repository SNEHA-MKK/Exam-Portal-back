const mongoose = require("mongoose")

const adminQuestSchema = new mongoose.Schema({
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

const admins = mongoose.model("adminQuestion", adminQuestSchema)

module.exports = admins