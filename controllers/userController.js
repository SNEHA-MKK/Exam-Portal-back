const users = require("../modal/userSchema");
const admins = require("../modal/adminSchema")
const jwt = require('jsonwebtoken')
// const userResult = require('../modal/userResultSchema')

//logic to resolve the register request
exports.register = async (req, res) => {

    console.log('inside register controller');
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {

        const existingUser = await users.findOne({ mailId: email })

        if (existingUser) {
            res.status(406).json('Account Already Exist')
        } else {
            //create object for the model
            const newUser = new users({
                username,
                mailId: email,
                password,
                profile: ""
            })
            //to save the data in the mongodb

            await newUser.save()

            //response
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(401).json(error)
    }

}

//login to resolve login
exports.login = async (req, res) => {
    console.log('inside login function');
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ mailId: email, password })
        const adminUser = await admins.findOne({ email, password })
   
        if (!existingUser && !adminUser) {
            return res.status(404).json('No account found with this email. Please register.');
        }

        if (adminUser) {
            // token generate
            const token = jwt.sign({ adminId: adminUser._id }, 'supersecretkey')
            res.status(200).json({
                adminUser,
                token
            })
        }
        else if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey')
            //to send more than one data , it shoud be either array or object
            res.status(200).json({
                existingUser,
                token
            })
            //if both key and value are same , on;y need to give one
        } else {
            res.status(401).json('Invalid Email ID or password')
        }
    } catch (error) {
        res.status(401).json(`request failed due to ${error}`)
    }
}



