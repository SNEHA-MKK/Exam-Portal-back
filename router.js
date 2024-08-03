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
router.get('/admin-details',adminController.getAdminProfileController)

//path to add a category-admin
 router.post('/admin-category',jwtMiddleware,adminController.addAdCategory)

//get all admin category
router.get('/admin-getcategory',jwtMiddleware,adminController.getAllAdmCategory)

//path to delete a project
router.delete('/delete-category/:id',jwtMiddleware,adminController.deleteCategoryController)

//path to edit category
router.put('/update-AdmCategory/:id',jwtMiddleware,adminController.updateCatController)

//path to add a quiz-admin
router.post('/admin-quizz/:id',jwtMiddleware,adminController.addAdmQuiz)

//get all admin quiz
router.get('/admin-getquiz/:id',jwtMiddleware,adminController.getAllAdmQuiz)

//path to add a question-admin
router.post('/admin-question/:id',jwtMiddleware,adminController.addAdmQuiz)

//EXPORT ROUTER
module.exports = router
