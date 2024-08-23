const admins = require('../modal/adminProfileSchema')
const adminCat = require('../modal/adminCategorySchema')
const adminQuiz = require('../modal/adminQuizSchema')
// const adminsP = require("../modal/adminSchema")
const adminQuestion = require('../modal/adminQuestScema')
const userResult = require('../modal/userResultSchema')
const users = require("../modal/userSchema");



//add admin profile details
exports.addAdminProfile = async (req, res) => {
  console.log("inside add request");

  /*console.log(req.file);
  console.log(req.body);*/

  const profileImage = req.file.filename
  console.log(profileImage);

  const { phnNo, Role } = req.body
  console.log(phnNo, Role);

  try {
    const admin = new admins({
      phnNo: phnNo,
      Role: Role,
      profileImage: profileImage
    })
    await admin.save()
    res.status(200).json(admin)

  } catch (error) {
    res.status(401).json(`request failed due to ${error}`)
  }
}

//get adm profile details
exports.getAdminProfileController = async (req, res) => {
  try {
    const adminProfile = await admins.find()
    res.status(200).json(adminProfile)
  } catch (error) {
    res.status(401).json(`request failed due to ${error}`)
  }
}

//to add category
exports.addAdCategory = async (req, res) => {
  console.log('inside add requestttttt');
  console.log(req.payload);
  const adminid = req.payload

  // 66a76e113798ff1485a90b93

  // const adminIds = await adminsP.findById(adminid)

  // console.log(`Admin pid dsfjh fhg : ${adminIds}`);

  // const{_id ,email ,password}=adminIds
  // console.log(_id ,email ,password);
  // if(adminid==_id){
  const { title, description } = req.body
  console.log(title, description);

  try {

    const existingCategory = await adminCat.findOne({ title })
    //   console.log(lsjf);
    if (existingCategory) {
      res.status(406).json('Already Exist')
    } else {
      const newCategory = new adminCat({
        title, description
      })
      await newCategory.save() //to save the project in mongodb
      res.status(200).json(newCategory)
    }

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
    console.log(error);
  }
}

// }

//get admin category
exports.getAllAdmCategory = async (req, res) => {
  try {

    const allCategory = await adminCat.find()
    res.status(200).json(allCategory)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

//delete admin category

exports.deleteCategoryController = async (req, res) => {
  console.log(req);

  const { id } = req.params
  try {
    const result = await adminCat.findByIdAndDelete({ _id: id })
    res.status(200).json(result)
  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

//edit admin category
exports.updateCatController = async (req, res) => {

  const { id } = req.params
  const { title, description } = req.body


  try {
    const existingCategory = await adminCat.findByIdAndUpdate({ _id: id }, { title, description }, { new: true })
    await existingCategory.save()
    res.status(200).json(existingCategory)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

//to add quiz-admin
// exports.addAdmQuiz = async (req, res) => {
//   console.log('inside add request');
//   console.log(req.payload);


//   const { title, description, maxMarks, numberOfQuestions, publish, category} = req.body
//   console.log(title, description, maxMarks, numberOfQuestions, publish, category);

//   try {

//     const existingQuiz = await adminQuiz.findOne({title})

//     if (existingQuiz) {
//         res.status(406).json('Already Exist')
//     } else {
//       const newQuiz = new adminQuiz({
//         title,description
//       })
//       await newQuiz.save() //to save the project in mongodb
//       res.status(200).json(newQuiz)
//     }

//   } catch (error) {
//     res.status(401).json(`requested due to ${error}`)
//     console.log(error);
//   }
// }

exports.addAdmQuiz = async (req, res) => {
  console.log('inside quiz controller');

  const { id } = req.params
  const { title, description, maxMarks, numberOfQuestions, publish, category } = req.body;

  try {
    const existingQuiz = await adminQuiz.findOne({ title });

    console.log('inside quiz kjrg controller');
    if (existingQuiz) {
      return res.status(406).json('Already Exist');
    }

    const newQuiz = new adminQuiz({
      id,
      title,
      description,
      maxMarks,
      numberOfQuestions,
      publish,
      category
    });

    await newQuiz.save();
    res.status(200).json(newQuiz);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add Quiz', error });
  }
};

//get admin quiz
exports.getAllAdmQuiz = async (req, res) => {

  const { id } = req.params
  console.log(id);


  try {

    const allQuiz = await adminQuiz.find({ id: id })
    res.status(200).json(allQuiz)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}


//to add admin que
exports.addAdmQuestion = async (req, res) => {

  const { id } = req.params

  const { question, option1, option2, option3, option4, answer } = req.body;

  try {
    const existingQuestion = await adminQuestion.findOne({ question });

    if (existingQuestion) {
      return res.status(406).json('Question already exists');
    }

    const newQuestion = new adminQuestion({
      id,
      question,
      option1,
      option2,
      option3,
      option4,
      answer

    });

    await newQuestion.save();
    res.status(200).json(newQuestion);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json(`Failed to add question: ${error.message}`);
  }
};

//get admin question
exports.getAllAdmQuestion = async (req, res) => {

  const { id } = req.params
  console.log(id);


  try {

    const allQuestion = await adminQuestion.find({ id: id })
    res.status(200).json(allQuestion)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

//get user quiz
exports.getAllUserQuiz = async (req, res) => {


  // console.log(req.query.search );
  const searchKey = req.query.search 
  console.log(searchKey);
  

  // const { id } = req.params
  // console.log(id);

  try {

    const query = {
      title:{
        /*options - to remove case sensitivity*/
        $regex:searchKey,$options:'i'
      }
    }

    const allQuiz = await adminQuiz.find(query)
    res.status(200).json(allQuiz)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

//get admin question
exports.getAllUserQuestion = async (req, res) => {

  const { id } = req.params
  console.log(id);


  try {

    const allQuestion = await adminQuestion.find({ id: id })
    res.status(200).json(allQuestion)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

// To evaluate user answers
exports.evaluateUserAnswers = async (req, res) => {
  // console.log("hgfgfghg");
  
  const { id } = req.params; // quiz id

  const { userAnswers } = req.body; // user's answers { questionId: answer, ... }
  // const userids = req.payload

  console.log('Evaluating answers for quiz:', id);
  console.log('User answers:', userAnswers);

  try {
    const questions = await adminQuestion.find({ id }); // find questions for the given quiz id
    console.log(questions);


    if (!questions.length) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;

    questions.forEach(question => {
      const userAnswer = userAnswers[question._id];
      if (userAnswer && userAnswer === question[`option${question.answer.slice(-1)}`]) {
        score++;
      }
    });

    console.log(score);

    const quiz = await adminQuiz.find({ _id: id })
    console.log(quiz[0]);

    const uId = req.payload
    const qId = quiz[0].title

    const existingResult = await userResult.findOne({ userId: uId, quizId: qId })

    if (existingResult) {
      console.log('already exists');
      return res.status(400).json({ message: 'User has already attended this quiz' });


    }

    // Save the result
    const quizResult = new userResult({
      userId: req.payload, // Assuming req.payload contains userId from the middleware
      quizId: quiz[0].title,   // quiz[0].title,
      category: quiz[0].category, // Assuming all questions belong to the same category
      score,
      total: questions.length,
      // rank: ""
    });

    console.log(quizResult);

    await quizResult.save();

    console.log('jhgh')
    console.log(quizResult);


    res.status(200).json({ score, total: questions.length });
  } catch (error) {
    res.status(500).json({ message: `Failed to evaluate answers: ${error.message}` });
  }
};

//get user results
exports.getUserResults = async (req, res) => {

  // const { id } = req.params
  // console.log(id);
  const userId = req.payload


  try {

    const userResults = await userResult.find({ userId })
    res.status(200).json(userResults)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

//get Admin results
exports.getAdminResults = async (req, res) => {
  // const jshd = req.params

  try {

    console.log('inside');

    const userResults = await userResult.find()
    console.log(userResults);

    res.status(200).json(userResults)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}

exports.quizTopper = async (req, res) => {

  console.log('topper controller');

  const { id } = req.params; // quiz id

  console.log('quiz id:', id);


  try {
    console.log('inside try');

    const quiz = await adminQuiz.findOne({ _id: id })
    console.log(quiz.title);
   


    const topper = await userResult.find({ quizId: quiz.title }); // find questions for the given quiz id
    console.log(topper);


    if (!topper.length) {
      return res.status(404).json({ message: "No one attended the quiz" });
    }


    let QuizTopper = topper[0]
    topper.forEach(topper => {
      if (topper.score > QuizTopper.score) {
        QuizTopper = topper;
      }
    });

    console.log(QuizTopper);
    console.log(QuizTopper.userId);
    
    const userName = await users.findOne({ _id: QuizTopper.userId})
    console.log(userName);

    res.status(200).json(QuizTopper);

  } catch (error) {
    res.status(500).json({ message: `Failed to evaluate answers: ${error.message}` });
  }
};







