//this is for register different routes
//end points for the api running
const express = require('express')

// controller fucntion
const { signupUser ,
        loginUser,
       // getUserProfile,
        //updateUserProfile,
        resetPwLink,
        forgotPwTime,
        changePw
     } = require('../controllers/userController')

const router = express.Router()

// login route
router.post("/login", loginUser)

// signup route
router.post("/signup", signupUser)

// get userprofile
//router.get("/profile/:id",getUserProfile )

// updateProfile
//router.put("/update-profile",updateUserProfile )

// send email link for reser password
router.post("/sendpasswordlink",resetPwLink)

// verify user for forgot password time
router.get("/forgotpassword/:id/:token",forgotPwTime )

//change password
router.post("/:id/:token",changePw)

module.exports = router
