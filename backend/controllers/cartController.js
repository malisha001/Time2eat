const Cart = require('../models/cartModel')
const OnlineOrderModel = require('../models/onlineOrderModel')
const mongoose = require('mongoose')

//get spesific customer's orders with different restaurent (order id change for each restaurent)
const getCart = async (req, res) => {
    const {id} = req.params
    try {
        const carts = await Cart.find({cusId:id});

        if (!carts) {
            return res.status(404).json({ error: 'No order found for the specified restaurant' });
        }
        
        res.status(200).json(carts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//create new cart
const createCart = async (req, res) => {
    const {cusId,cusname,restaurantid,foodname, orderid, tprice} = req.body

    //add doc to database
    try {

        const cart = await Cart.create({cusId,cusname,restaurantid,foodname, orderid, tprice})
        res.status(200).json(cart)
    }catch (error){
        res.status(400).json({error: error.message})


    }
}

//delete an cart
const deleteCart = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'invalide object id'})
    }

    const cart = await OnlineOrderModel.findOneAndDelete({_id: id})

    if (!cart) {
        return res.status(404).json({error: 'No such cart'})
    }

    res.status(200).json(cart)
}


//update an cart
const updateCart = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such cart'})
    }

    const cart = await Cart.findOneAndUpdate({_id: id}, {
        ...req.body
    })
   
    if (!cart) {
        return res.status(404).json({error: 'No such cart'})
    }

    res.status(200).json(cart)
}
module.exports = {
    getCart,
    createCart,
    deleteCart,
    updateCart

}