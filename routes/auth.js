const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/auth-middleware')
const { login,register,deleteUser,loggedIn } = require('../controller/auth')

router.route('/login').post(login)
router.route('/register').post(register)
router.route('/delete').delete(authMiddleware,deleteUser)
router.route('/').get(authMiddleware,loggedIn)

module.exports = router