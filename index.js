//only file that runs in the backend.
require('dotenv').config()
const express = require('express')
const cors = require('cors')
//import router from router.js
const router=require('./router')
require('./db/connection')
const examPortalServer = express()
examPortalServer.use(cors())
examPortalServer.use(express.json())
//server use router
examPortalServer.use(router)
//first argu -by which name the folder have to be called
//second argu - exporting this folder
//the path to provide in src of frontend to display(as part of converting string to url)

examPortalServer.use('/uploads',express.static('./uploads'))

const PORT = 4000 || process.env.PORT
examPortalServer.listen(PORT, () => {
    console.log(`project fair server running successfully at port number : ${PORT}`);
})
