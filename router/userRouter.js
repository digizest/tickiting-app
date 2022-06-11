const express = require ('express')

const router = express.Router()

const {signUp, loginUser} = require('../controller/user.controller')

router.post('/signUp' , signUp)

router.post('/login',loginUser)



module.exports = router