const Restaurant = require('../models/regrestaurantsModel')
const mongoose = require('mongoose')

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


module.exports = {
  getRestaurant,
  getRestaurants,  
  addRestaurant,
  deleteRestaurant,
  updateRestaurant, 
}