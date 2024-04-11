const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(fullName, email, address,contactNo, password, confirmPassword) {

//Validation
    //check whether there is a value for the email & password
    if (!fullName || !email || !address|| !contactNo || !password || !confirmPassword) {
        throw Error('All fields must be filled')
    }

    // check if the email is a valid email
    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }

    //check if the password is strong enough
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    // check if the password and the confirmPassword is the same
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }

	//check wether the email exists
    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

	//create a salt & hash the password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

	 //create new user
    const user = await this.create({ fullName, email, address, contactNo, password: hash ,confirmPassword})

	//return the user
    return user
}

//static login method
userSchema.statics.login = async function(email,password){

    //check whether there is a value for the email & password
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    //find the user
    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Incorrect email')
    }

    // compare the plain text pw with the hashed pw
    const match = await bcrypt.compare(password, user.password)
    
    if(!match){
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model('User', userSchema)