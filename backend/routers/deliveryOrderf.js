const express = require('express')
const router = express.Router()
const {
    getDeliveryOrders,
    createDeliveryOrders,
    assignRider
} = require('../Controllers/deliveryOrderController')

//get delivery orders
router.get('/:id',getDeliveryOrders)

//add delivery orders
router.post('/',createDeliveryOrders)

//assign rider(update)
router.patch('/:id',assignRider)

module.exports = router