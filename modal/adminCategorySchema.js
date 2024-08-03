const mongoose = require("mongoose")

const adminCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
       
        
    },
    description: {
        type: String,
        required: true
    }
    
})

const adminCat = mongoose.model("admincategories",adminCategorySchema)

module.exports = adminCat