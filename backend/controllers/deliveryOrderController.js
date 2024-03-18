const Deliveryorder = require('../models/deliveryOrderModel')
const mongoose = require('mongoose')

//get all orders
const getDeliveryOrders = async(req,res) =>{
    const deleveries = await Deliveryorder.find({})

    res.status(200).json(deleveries)
}

//create delivery orders
const createDeliveryOrders = async(req,res) =>{
    const{userId,deliveryPersonId,ordersId,foodId,foodName,totPrice,deliveryFee,orderStatus} = req.body

    try {
        const orderDetails = await Deliveryorder.create({userId,deliveryPersonId,ordersId,foodId,foodName,totPrice,deliveryFee,orderStatus})
        res.status(200).json(orderDetails)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//assign riders(update)
const assignRider = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Restaurant'})
    }
    const rider = await Deliveryorder.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!rider){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(rider)
}
module.exports = {
    getDeliveryOrders,
    createDeliveryOrders,
    assignRider
}
