const express = require('express')
const AuthController = require('../controllers/AuthController')

const router = express.Router()
const authController = new AuthController()

router.post(
    '/signin',
    authController.userLogin
)

router.post(
    '/signup',
    authController.userSignUp
)

module.exports = { authRouter: router, authController } //authController is for testing
