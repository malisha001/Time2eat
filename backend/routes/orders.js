const express = require('express')
const Order = require('../models/orderModel')

const router = express.Router()

//get all orders
router.get('/', (req, res) => {
    res.json({ mssg: 'GET all orders' })

})

//get a single order
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single order'})

})

//post a new order
router.post('/',async (req, res) => {
    const {fooditems, quantity, price,state } = req.body

    try {

        const order = await Order.create({fooditems, quantity, price, state })
        res.status(200).json(order)
    }catch (error){
        res.status(400).json({error: error.message})


    }
})

//delete an order
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE an order'})
})

//update an order
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE an order'})
})



module.exports = router