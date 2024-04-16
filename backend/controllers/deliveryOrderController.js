const Deliveryorder = require('../models/deliveryOrderModel')
const mongoose = require('mongoose')

//get all orders
const getDeliveryOrders = async(req,res) =>{
    const deleveries = await Deliveryorder.find({})

    res.status(200).json(deleveries)
}

//when rider accept order that order add this table
const createDeliveryOrders = async(req,res) =>{
    const{orderId,riderId,customerLocation,restaurantname,reslocation} = req.body

    try {
        const orderDetails = await Deliveryorder.create({orderId,riderId,customerLocation,restaurantname,reslocation})
        res.status(201).json(orderDetails)
        console.log(orderDetails)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//update kitchen manager when order ready, update estimate time by rider
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
