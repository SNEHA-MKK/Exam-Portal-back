const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true  
    }

})

const admins = mongoose.model("admins", adminSchema)

module.exports = admins