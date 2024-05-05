const Restaurant = require('../models/regrestaurantsModel')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer');

//get all restaurants
const getRestaurants = async (req , res) =>{
    const restaurants = await Restaurant.find({}).sort({createAt: -1})
    res.status(200).json(restaurants)
}

// get a single restaurant 
const getRestaurant = async(req , res) =>{
    const {id} = req.params

    const restaurant = await Restaurant.findOne({Restaurant_Id:id})

    if(!restaurant){
        return res.status(404).json({error : 'No such Restauran'})
    }
    res.status(200).json(restaurant)
}

//add new restaurant
const addRestaurant = async(req , res) => {
    const{Restaurant_Id, Restaurant_licensenumber, Restaurant_name, Restaurant_Managersname, Email_address, contact, Password, Confirm_paasword, Address, Couple_table, Group_table,status} = req.body
    
    try{
       const restaurant = await Restaurant.create({
        Restaurant_Id, Restaurant_licensenumber, Restaurant_name, Restaurant_Managersname, Email_address , contact, Password, Confirm_paasword, Address, Couple_table, Group_table,status
       })
       res.status(200).json(restaurant)
    }catch(error){
       res.status(400).json({error: error.message})
    }

}

//delete restaurant
const deleteRestaurant = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Restaurant'})
    }
    const restaurant = await Restaurant.findByIdAndDelete({_id: id})

    if(!restaurant){
        return res.status(404).json({error : 'No such Restauran'})
    }
    res.status(200).json(restaurant)
}


//update restaurant
const updateRestaurant = async(req , res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Restaurant' })
    }
    const restaurant = await Restaurant.findByIdAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!restaurant) {
        return res.status(404).json({ error: 'No such Restaurant' })
    }

    if (req.body.status === 'true') {
        try {
            // Create a nodemailer transporter
            let transporter = nodemailer.createTransport({
                // Your email configuration (SMTP or other)
                // For example, using Gmail SMTP:
                service: 'gmail',
                auth: {
                    user: 'rathnamalalathenuka@gmail.com',
                    pass: 'uliq kqlz nhds cuhx'
                }
            });

            // Send mail with defined transport object
            let info = await transporter.sendMail({
                from: '"Admin" <rathnamalalathenuka@gmail.com>',
                to: req.body.Email_address, // Use the relevant email address from your request body
                subject: 'Your Restaurant Application is Approved!',
                text: 'Congratulations! Your restaurant application has been approved.'
            });

            console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    res.status(200).json(restaurant)
}



module.exports = {
  getRestaurant,
  getRestaurants,  
  addRestaurant,
  deleteRestaurant,
  updateRestaurant, 
}