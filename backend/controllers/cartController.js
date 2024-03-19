const Cart = require('../models/cartModel')
const mongoose = require('mongoose')

//get all carts
const getCarts = async (req, res) => {
    const carts = await Cart.find({}).sort({createdAt: -1})

    res.status(200).json(carts)
}

//get a single cart
const getCart = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such cart'})
    }

    const cart = await Cart.findById(id)

    if (!cart) {
        return res.status(404).json({error: 'No such cart'})
    }

    res.status(200).json(cart)
}


//create new cart
const createCart = async (req, res) => {
    const {fooditem, quantity, price , name } = req.body

    //add doc to database
    try {

        const cart = await Cart.create({fooditem, quantity, price, name })
        res.status(200).json(cart)
    }catch (error){
        res.status(400).json({error: error.message})


    }
}


//delete an cart
const deleteCart = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such cart'})
    }

    const cart = await Cart.findOneAndDelete({_id: id})

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
    getCarts,
    getCart,
    createCart,
    deleteCart,
    updateCart

}