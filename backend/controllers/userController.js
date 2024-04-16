//contain controller functions
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const nodemailer =require("nodemailer");
const bcrypt = require('bcrypt')


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

// Signup a user
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
//not working
// // get a single user
// const getUserProfile = async (req, res) => {
//     const { id } = req.params
//         //check if the id added is valid
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'Invalid user ID'})
//     }
//     try {
//         // Find the user by id
//         const user = await User.findById(id)

//         // Check if the user exists
//         if (!user) {
//             return res.status(404).json({error: 'user not found'})
//         }

//         // If user exists, return the user profile data
//         res.status(200).json(user)
//     } catch (error) {   
//          // Handle errors
//         console.error('Error fetching user profile:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

// //USER update profile
// const updateUserProfile = async(req,res) =>{
//     try{
//         const { fullName, email, address, contactNo, password} = req.body;
//         const user = await User.findById(req.user._id);

//         // Password validation
//         if(password && passsword.length < 6){
//                return res.status(400).json ({error:'Password is Required and 6 character long'});
//             }
//             // Hash password if provided
//             const salt = await bcrypt.genSalt(10)
//             const hash = password ? await bcrypt.hash(password, salt) : undefined;
//              //create a salt & hash the password
           
           
//             // Update user profile
//             const updatedUser = await user.findByIdAndUpdate(req.user._id,{
//                 fullName:fullName ||user.fullName,
//                 email:email ||user.email,
//                 address:address || user.address,
//                 contactNo:contactNo || user.contactNo,
//                 password: hash || user.password // Only update password if provided
//             }, { new:true });

//             res.status(200).send({
//                 success: true,
//                 message: "Profile Updated SUccessfully",
//                 updatedUser,
//               }); 
        
//     } catch (error) {
//         console.log(error);
//         res.status(400).send({
//           success: false,
//           message: "Error WHile Update profile",
//           error,
//         });
//     }      
// }

// //email config
const trasporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"uwasarad@gmail.com",
        pass:"1234567"
    }
})

//send reset password
const resetPwLink = async (req, res) => {
    console.log(req.body);

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try{
        const user = await User.findOne({email:email});

        //token generate for reset password
        const token =  jwt.sign({ _id:user._id }, process.env.SECRET, {
            expiresIn: '120s'
        });

        const setusertoken = await User.findByIdAndUpdate({_id:user._id,},{verifytoken:token},{new:true}); 
         
        if(setusertoken) {
            const mailOptions = {
                from:"uwasarad@gmail.com",
                to:email,
                subject:"Sending email for password reset",
                text:`Thos Link Valid for 2 MINITUES http://localhost:3000/forgotpassword/${user.id}/${setusertoken.verifytoken}`
            }

            trasporter.sendMail(mailOptions,(error,info) =>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent", info.response);
                    res.status(201).json({status:201,message:"Email sent successfully"})
                }
            })
        }

    }catch(error){
            res.status(401).json({status:401,message:"invalid user"})
    }

};

//verify user for forgot password time
const forgotPwTime =async (req,res) => {

        const {id,token} =req.params;

       try {
        const validUser = await User.findOne({_id:id,verifytoken:token});
        
        const verifyToken = jwt.verify(token,process.env.SECRET);

        console.log(verifyToken)

        if(validUser && verifyToken._id){
            res.status(201).json({status:201,validUser})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }

    } catch (error) {
        res.status(401).json({status:401,error})
    }
};

//change password
const changePw = async (req,res) => {

    const {id,token} =req.param;
    const {password} =req.body;

    try{
        const validUser = await User.findOne({_id:id, verifytoken:token});
        
        const verifyToken = jwt.verify(token, process.env.SECRET);

        if(validUser && verifyToken._id){
                
                const newpassword = await hashPassword(password)

                const setNewUserPass = await User.findByIdAndUpdate({_id:id},{password:newpassword});

                setNewUserPass.save();
                res.status(201).json({status:201,setNewUserPass})
        }else{
            res.status(401).json({status:401,message:"user not exist"})
        }
    }catch (error){
        console.log(error);
        res.status(401).json({status:401,error})
    }
}


module.exports = { 
    signupUser,
    loginUser,
   // getUserProfile,
    //updateUserProfile,
    resetPwLink,
    forgotPwTime,
    changePw
    }