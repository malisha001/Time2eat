const express = require('express')
const router = express.Router()
const {
    getriderdetails,
    getOnlineOrders,
    getdetailsforpayment,
    getdeliveryOrders,
    updateriderstatus,
    addOnlineOrders,
    deleteOnlineOrders
} = require('../controllers/onlineOrderController')

//post a new online orders
router.post('/', addOnlineOrders)

//get delivery orders for riders
router.get('/rider', getdeliveryOrders)

//get all orders for kitchen manager for each restaurent
router.get('/:id', getOnlineOrders)

//delete an order
router.delete('/:id', deleteOnlineOrders)

//update online orders when rider selected
router.patch('/rider/:id', updateriderstatus)

//if found rider show the customer
router.get('/customer/:id', getriderdetails)

//get details for payment
router.get('/payment/:id', getdetailsforpayment)

module.exports = router