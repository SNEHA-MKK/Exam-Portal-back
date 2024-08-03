const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then((res)=>{
    // console.log(process.env);
    // console.log(connectionString);
    console.log('mongodb connected successfully');
}).catch((err)=>{
    console.log(err);
})