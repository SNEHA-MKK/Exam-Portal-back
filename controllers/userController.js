
const admins = require("../modal/adminSchema")
const jwt = require('jsonwebtoken')
const userResult = require('../modal/userResultSchema')
const adminQuiz = require('../modal/adminQuizSchema')
const users = require("../modal/userSchema")
const userFeedback = require("../modal/userFeedback")
// const userResult = require('../modal/userResultSchema')

//logic to resolve the register request
exports.register = async (req, res) => {

    console.log('inside register controller');
    const { username, email, password, phone, qualification } = req.body
    console.log(username, email, password, phone, qualification);

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
                phone,
                qualification
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

//get user profile details
exports.getUsersProfile = async (req, res) => {
    console.log("sjdgh");



    try {

        const userProfile = await users.find()
        res.status(200).json(userProfile)
        console.log(userProfile);


    } catch (error) {

        res.status(401).json(`requested due to ${error}`)
    }
}

//user - rank
// exports.getUserRank = async (req, res) => {

//     console.log('rank controller');

//     const { id } = req.params; // quiz id

//     console.log('quiz id:', id);

//     const userId = req.payload
//     console.log(userId);


//     try {
//         console.log('inside try');

//         const quiz = await adminQuiz.findOne({ _id: id })
//         console.log(quiz.title);


//         const level = await userResult.find({ quizId: quiz.title }).sort({ score: -1 });; // find questions for the given quiz id
//         console.log(level);

//         if (!level.length) {
//             return res.status(404).json({ message: "No one attended the quiz" });
//         }

//         // Step 2: Assign ranks based on score
//         let rank = 1;
//         let previousScore = null;
//         let usersWithRanks = [];


//         level.forEach((result, index) => {
//             if (previousScore !== null && result.score < previousScore) {
//                 rank = index + 1; // Update rank if score changes
//             }
//             usersWithRanks.push({
//                 userId: result.userId,
//                 score: result.score,
//                 rank: rank
//             });
//             previousScore = result.score;
//         });





//         res.status(200).json(usersWithRanks);

//     } catch (error) {
//         res.status(500).json({ message: `Failed to evaluate answers: ${error.message}` });
//     }
// };


exports.getUserRank = async (req, res) => {
    console.log('rank controller');
    const { id } = req.params; // quiz id
    const userId = req.payload; // Assuming this is the user ID from the token

    try {
        console.log('inside try');

        // Step 1: Fetch the quiz by ID
        const quiz = await adminQuiz.findOne({ _id: id });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        console.log('quiz title:', quiz.title);

        // Step 2: Fetch all results for this quiz, sorted by score in descending order
        const results = await userResult.find({ quizId: quiz.title }).sort({ score: -1 });
        if (!results.length) {
            return res.status(404).json({ message: "No one attended the quiz" });
        }
        console.log(results);

        // Step 3: Assign ranks based on score
        let level = 1;
        let previousScore = results[0].score;
        let usersWithRanks = [];

        for (let i = 0; i < results.length; i++) {
            const result = results[i];

            // If the current score is less than the previous score, update the rank
            if (result.score < previousScore) {
                level = i + 1;
            }

            // Update the result with the rank
            result.rank = level;
            await result.save(); // Save the rank back to the database

            usersWithRanks.push({
                userId: result.userId,
                score: result.score,
                rank: level
            });

            previousScore = result.score;
        }

        const response = await userResult.find({ userId: userId, quizId: quiz.title })
        console.log(response);


        // Step 4: Return the ranked users
        res.status(200).json(response);

    } catch (error) {
        console.error('Error calculating ranks:', error);
        res.status(500).json({ message: `Failed to calculate ranks: ${error.message}` });
    }
};


// exports.updateProfileController = async(req,res)=>{
//     const userId = req.payload

//     const {username,mailId,password,phone,qualification,profile} = req.body

//     profileImage = req.file?req.file.filename:profile
//     console.log(profileImage);


//     try{

//        const existingUsers = await users.findByIdAndUpdate({_id:userId},{username,mailId,password,phone,qualification,profile:profileImage},{new:true})

//        console.log(existingUsers);


//        await existingUsers.save()


//        res.status(200).json(existingUsers)

//     }catch (error){
//        res.status(401).json(`requested failed due to ${error} `)
//     }
// }

exports.updateProfileController = async (req, res) => {
    const userId = req.payload;
    console.log(userId);

    if (!userId) {
        return res.status(401).json("Unauthorized: No user ID in request payload");
    }

    const { username, mailId, password, phone, qualification, profile } = req.body;
    const profileImage = req.file ? req.file.filename : profile;

    try {
        const existingUser = await users.findByIdAndUpdate(
            { _id: userId },
            { username, mailId, password, phone, qualification, profile: profileImage },
            { new: true }
        );

        if (!existingUser) {
            return res.status(404).json("User not found");
        }

        await existingUser.save();
        res.status(200).json(existingUser);
    } catch (error) {
        res.status(500).json(`Request failed due to ${error}`);
    }
};

//to add category
exports.addUserFeedback = async (req, res) => {
    console.log('inside add feedback');
    console.log(req.payload);
    const userId = req.payload
    console.log( req.body);
    
    const {feedback} = req.body


    // const { description } = req.body
    // console.log(description);

    try {

        const existingUser = await users.findOne({ _id: userId })
        console.log(existingUser);

        const newFeedback = new userFeedback({
            userId,
            name: existingUser.username,
            mail: existingUser.mailId,
            qualification: existingUser.qualification,
            description: feedback,
            profile:existingUser.profile
        })
        await newFeedback.save() //to save the project in mongodb
        res.status(200).json(newFeedback)


    } catch (error) {
        res.status(401).json(`requested due to ${error}`)
        console.log(error);
    }
}

// }

//get all feedbacks - user
exports.getAllFeedbacks = async (req, res) => {
    try {
  
      const allFeedbacks = await userFeedback.find()
      res.status(200).json(allFeedbacks)
  
    } catch (error) {
      res.status(401).json(`requested due to ${error}`)
    }
  }
