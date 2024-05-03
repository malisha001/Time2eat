const Restaurant = require('../models/regrestaurantsModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// return a token 
const createToken = ( user ) => { // user is gonna logged in for 1 days
    return jwt.sign({_id: user._id,role:user.role}, process.env.SECRET, {expiresIn: '1d'})

}

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
const updateRestaurant = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Restaurant'})
    }
    const restaurant = await Restaurant.findByIdAndUpdate({_id: id},{
        ...req.body
    })
  
    if(!restaurant){
        return res.status(404).json({error : 'No such Restauran'})
    }
    res.status(200).json(restaurant)
}
//restaurent login
const loginRestaurant = async (req, res) => {
    const { email, password } = req.body;
    const Email_address = email;
    const Password = password;

    try {
        if (!Email_address || !Password) {
            throw Error('All fields must be filled');
        }

        // Assuming `User` is your model for users
        const user = await Restaurant.findOne({ Email_address });
        if (!user) {
            throw Error('Incorrect email');
        }

        if (user.status !== 'true') {
            throw Error('Admin not approved');
        }

        // Assuming `Restaurant` is your model for restaurants
        const restaurant = await Restaurant.findOne({ Email_address, Password });
        if (!restaurant) {
            return res.status(404).json({ error: 'No such Restaurant' });
        }

        const token = createToken(restaurant);
        res.status(200).json({ Email_address, token, role: restaurant.role });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
  getRestaurant,
  getRestaurants,  
  addRestaurant,
  deleteRestaurant,
  updateRestaurant,
  loginRestaurant
}