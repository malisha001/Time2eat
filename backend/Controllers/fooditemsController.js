const Fooditems = require('../models/fooditemsModel')
const mongoose = require('mongoose')

//get all fooditems
const getFooditems = async (req , res) =>{
    const fooditems = await Fooditems.find({}).sort({createAt: -1})
    res.status(200).json(fooditems)
}

// get a single fooditem
const getFooditem = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Food'})
    }
    const fooditem = await Fooditems.findById(id)

    if(!fooditem){
        return res.status(404).json({error : 'No such Food'})
    }
    res.status(200).json(fooditem)
}

//add new fooditem
const addFooditem = async(req , res) => {
    const{Item_id, Item_name, catagory, Price, Cost,Profit,Average_preparetime} = req.body
    try{
       const fooditem = await Fooditems.create({
        Item_id, Item_name, catagory, Price ,Cost,Profit,Average_preparetime
       })
       res.status(200).json(fooditem)
    }catch(error){
       res.status(400).json({error: error.message})
    }

}

//delete fooditem
const deleteFooditem = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Fooditem'})
    }
    const fooditem = await Fooditems.findByIdAndDelete({_id: id})

    if(!fooditem){
        return res.status(404).json({error : 'No such Fooditem'})
    }
    res.status(200).json(fooditem)
}


//update restaurant
const updateFooditem = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Fooditem'})
    }
    const fooditem = await Fooditems.findByIdAndUpdate({_id: id},{
        ...req.body
    })
  
    if(!fooditem){
        return res.status(404).json({error : 'No such Fooditem'})
    }
    res.status(200).json(fooditem)
}

module.exports = {
  getFooditem,
  getFooditems,
  addFooditem,
  deleteFooditem,
  updateFooditem
}