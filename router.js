//import express in router file
const express = require('express')

//import userController
const userController = require('./controllers//userController')
const adminController = require('./controllers/adminController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')
const userMiddleware = require('./middleware/userMiddleware')

//to create router use a class Router in the express library
const router = new express.Router()

//path to resolve register request
router.post('/user/register', userController.register)

//path to resolve login request
router.post('/user/login', userController.login)

//path to add admin profile details
router.post('/adminProfile', multerConfig.single('profileImage'), adminController.addAdminProfile)

// path to get admin profile details
router.get('/admin-details', adminController.getAdminProfileController)

// path to get user details in profile
router.get('/users-profile', userController.getUsersProfile)

//path to add a category-admin
router.post('/admin-category', jwtMiddleware, adminController.addAdCategory)

//get all admin category
router.get('/admin-getcategory', jwtMiddleware, adminController.getAllAdmCategory)

//path to delete a project
router.delete('/delete-category/:id', jwtMiddleware, adminController.deleteCategoryController)

//path to delete a quiz
router.delete('/delete-quiz/:id', jwtMiddleware, adminController.deleteQuizController)

//path to delete a quest
router.delete('/delete-quest/:id', jwtMiddleware, adminController.deleteQuestController)

//path to edit category
router.put('/update-AdmCategory/:id', jwtMiddleware, adminController.updateCatController)

//path to edit quiz
router.put('/update-AdmQuiz/:id', jwtMiddleware, adminController.updateQuizController)



//path to add a quiz-admin
router.post('/admin-quizz/:id', jwtMiddleware, adminController.addAdmQuiz)

//get all admin quiz
router.get('/admin-getquiz/:id', jwtMiddleware, adminController.getAllAdmQuiz)

//path to add a question-admin
router.post('/admin-question/:id', jwtMiddleware, adminController.addAdmQuestion)

//get all admin questions
router.get('/admin-getquestion/:id', jwtMiddleware, adminController.getAllAdmQuestion)

//get all user quiz
router.get('/user-getquiz', userMiddleware, adminController.getAllUserQuiz)

//get home quiz

router.get('/home-getquiz', adminController.getAllHomeQuiz)

//get all user questions
router.get('/user-getquestion/:id', userMiddleware, adminController.getAllUserQuestion)

//evaluate users answers
router.post('/evaluate-answers/:id', userMiddleware, adminController.evaluateUserAnswers);

//get all user results
router.get('/user-results', userMiddleware, adminController.getUserResults)

//get all ADmin user results
router.get('/admin-results', jwtMiddleware, adminController.getAdminResults)

//topper - quiz wise
router.get('/postQuiz-topper/:id', jwtMiddleware, adminController.quizTopper);

//rank - user
router.get('/user-rank/:id', userMiddleware, userController.getUserRank);

//path to edit profile
router.put('/update-profile',userMiddleware,multerConfig.single('profile'),userController.updateProfileController)


//path to add a userFeedback
router.post('/user-feedback', userMiddleware,userController.addUserFeedback )

//get all feedback - user
router.get('/get-reviews', userController.getAllFeedbacks)

//EXPORT ROUTER
module.exports = router
