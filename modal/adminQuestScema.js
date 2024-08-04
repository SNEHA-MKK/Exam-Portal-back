const mongoose = require("mongoose")

const adminQuestSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    option1: {
        type: String, // Array of strings for options
        required: true
    },
    option2: {
        type: String, // Array of strings for options
        required: true
    },
    option3: {
        type: String, // Array of strings for options
        required: true
    },
    option4: {
        type: String, // Array of strings for options
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

const adminsQuest = mongoose.model("adminquestions", adminQuestSchema)

module.exports = adminsQuest