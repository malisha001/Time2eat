const express = require('express')
const Order = require('../models/cartModel')

const router = express.Router()

//get all cart
router.get('/', (req, res) => {
    res.json({ mssg: 'GET all cart' })

})

//get a single cart
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single cart'})

})

//post a new cart
router.post('/',async (req, res) => {
    const {fooditems, quantity, price} = req.body

    try {

        const order = await Order.create({fooditems, quantity, price })
        res.status(200).json(cart)
    }catch (error){
        res.status(400).json({error: error.message})


    }
})

//delete an order
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE an cart'})
})

//update an order
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE an cart'})
})



module.exports = router