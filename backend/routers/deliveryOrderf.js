const express = require('express')
const router = express.Router()
const {
    getDeliveryOrders,
    updatetime,
    createDeliveryOrders,
    assignRider,
    updateorder,
    getorderhistory
} = require('../Controllers/deliveryOrderController')

//get delivery orders
router.get('/:id',getDeliveryOrders)

//add delivery orders
router.post('/',createDeliveryOrders)

//assign rider(update)
router.patch('/:id',assignRider)

//update estimate time
router.patch('/rider/:id',updatetime)

//update complete order
router.patch('/complete/:id',updateorder)

//fetch all completed orders
router.get('/completed/:id',getorderhistory)

module.exports = router