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
    phone:{
        require:true,
        type:Number
    },
    qualification:{
        require:true,
        type:String
    }
   
})

const users = mongoose.model('users',userSchema)
module.exports=users