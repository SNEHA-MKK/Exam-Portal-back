const admins = require('../modal/adminProfileSchema')
const adminCat = require('../modal/adminCategorySchema')
const adminQuiz = require('../modal/adminQuizSchema')
const adminsP = require("../modal/adminSchema")


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

  const { id } = req.params
  const { title, description, maxMarks, numberOfQuestions, publish, category } = req.body;

  try {
    const existingQuiz = await adminQuiz.findOne({ title });
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

    const allQuiz = await adminQuiz.find({id:id})
    res.status(200).json(allQuiz)

  } catch (error) {
    res.status(401).json(`requested due to ${error}`)
  }
}


//to add admin que
exports.addAdmQuiz = async (req, res) => {

  const { id } = req.params
  const { title, description, maxMarks, numberOfQuestions, publish, category } = req.body;

  try {
    const existingQuiz = await adminQuiz.findOne({ title });
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




// 66a76e113798ff1485a90b93