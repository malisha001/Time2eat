const express = require('express')
const {
    createOrder,
    getOrders,
    getOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/dineinOrderController');


const router = express.Router()

//get all dine in orders
router.get('/', getOrders)


//get a single dine in order
router.get('/:id', getOrder)

//post a new dine in order
router.post('/', createOrder )

//delete an dine in order
router.delete('/:id', deleteOrder)


//update an dine in order
router.patch('/:id', updateOrder)


module.exports = router;