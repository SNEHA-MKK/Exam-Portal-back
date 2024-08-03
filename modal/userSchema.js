//model for users collection in mongoDB

const mongoose = require('mongoose')


//schema

const userSchema = mongoose.Schema({
    username:{
        require:true,
        type:String
    },
    mailId:{
        require:true,
        type:String
    },
    password:{
        require:true,
        type:String
    },
    profile:{
        type:String
        //profile is not required  - it depends on users to upload image
    }
})

const users = mongoose.model('users',userSchema)
module.exports=users