const dineinorder = require('../models/dineinOrderModel.js');
const mongoose = require('mongoose')

//get all dine in orders
const getOrders = async (req, res) => {
    const orders = await dineinorder.find({}).sort({createdAt: -1})

    res.status(200).json(orders)
}

//get a single dine in order
const getOrder = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such order'})
    }

    const order = await dineinorder.findById(id)

    if (!order) {
        return res.status(404).json({error: 'No such order'})
    }

    res.status(200).json(order)
}


//create new dine in order
const createOrder = async (req, res) => {
    const { resname,restaurantid, tableid,fooditem, quantity, price,state , name } = req.body

    let emptyFields = []

    if (!resname) {
        emptyFields.push('resname')
    }
    if (!restaurantid) {
        emptyFields.push('restaurantid')
    }
    if (!tableid) {
        emptyFields.push('tableid')
    }
    if (!fooditem) {
        emptyFields.push('fooditem')
    }
    if (!quantity) {
        emptyFields.push('quantity')
    }
    if (!price) {
        emptyFields.push('price')
    }
    if (!state) {
        emptyFields.push('state')
    }
    if (!name) {
        emptyFields.push('name')
    }
    

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    //add doc to database
    try {

        const order = await dineinorder.create({resname,restaurantid, tableid, fooditem, quantity, price, state,name })
        res.status(200).json(order)
    }catch (error){
        res.status(400).json({error: error.message})


    }
}


//delete an dine in order
const deleteOrder = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such order'})
    }

    const order = await dineinorder.findOneAndDelete({_id: id})

    if (!order) {
        return res.status(404).json({error: 'No such order'})
    }

    res.status(200).json(order)

}


//update an dine in order
const updateOrder = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such order'})
    }

    const order = await dineinorder.findOneAndUpdate({_id: id}, {
        ...req.body
    })
   
    if (!order) {
        return res.status(404).json({error: 'No such order'})
    }

    res.status(200).json(order)


}



module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder

}