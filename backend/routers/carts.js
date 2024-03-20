const express = require('express')
const {
    createCart,
    getCarts,
    getCart,
    deleteCart,
    updateCart
} = require('../controllers/cartController')


const router = express.Router()

//get all carts
router.get('/', getCarts)

//get spesific customer's orders with different restaurent
router.get('/:id', getCart)

//post a new cart
router.post('/', createCart)

//delete an order
router.delete('/:id', deleteCart)

//update an order
router.patch('/:id', updateCart)



module.exports = router