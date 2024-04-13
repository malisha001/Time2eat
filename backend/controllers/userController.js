const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// return a token 
const createToken = ( _id ) => { // user is gonna logged in for 3 days
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})

}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email,password)
       
        //create token
        const token =  createToken(user._id)

        res.status(200).json({email, token})
    }catch (error){
        res.status(400).json({error: error.message})
    }

}

// signup a user (customer)
const signupUser = async (req, res) => {
    const {fullName,email,address,contactNo, password, confirmPassword} = req.body

    try {
        const user = await User.signup(fullName,email,address,contactNo, password, confirmPassword)
       
        //create token
        const token =  createToken(user._id)

        res.status(200).json({email, token})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = { signupUser, loginUser }