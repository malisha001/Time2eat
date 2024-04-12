const express = require('express')
const router = express.Router()
const {
    getOnlineOrders,
    getdeliveryOrders,
    addOnlineOrders,
    deleteOnlineOrders
} = require('../controllers/onlineOrderController')

//get all orders for kitchen manager for each restaurent
router.get('/:id', getOnlineOrders)

//get delivery orders for riders
router.get('/rider', getdeliveryOrders)

//post a new online orders
router.post('/', addOnlineOrders)

//delete an order
router.delete('/:id', deleteOnlineOrders)

module.exports = router