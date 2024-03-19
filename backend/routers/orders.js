const express = require('express')
const {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/orderController')


const router = express.Router()

//get all orders
router.get('/', getOrders)


//get a single order
router.get('/:id', getOrder)

//post a new order
router.post('/', createOrder )

//delete an order
router.delete('/:id', deleteOrder)


//update an order
router.patch('/:id', updateOrder)


module.exports = router