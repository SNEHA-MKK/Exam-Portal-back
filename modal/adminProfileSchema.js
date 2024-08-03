const mongoose = require("mongoose")

const adminProfileSchema = new mongoose.Schema({
    profileImage: {
        type: String,
        required: true
    },
    phnNo: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true
    }
})

const admins = mongoose.model("adminprofiles", adminProfileSchema)

module.exports = admins