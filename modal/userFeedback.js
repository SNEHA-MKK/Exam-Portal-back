const mongoose = require("mongoose")

const userFeedback = new mongoose.Schema({

    userId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true


    },
    mail: {
        type: String,
        required: true


    },

    qualification: {
        type: String,
        required: true


    },
    description: {
        type: String,
        required: true
    }

})

const Feedback = mongoose.model("usersFeedbacks", userFeedback)

module.exports = Feedback