const express = require('express')
const {
    createCart,
    getCart,
    deleteCart,
    updateCart
} = require('../controllers/cartController')

const router = express.Router()

//get spesific customer's orders with different restaurent
router.get('/:id', getCart)

//insert new food item to cart
router.post('/', createCart)

//delete a food item in cart
router.delete('/:id', deleteCart)

//update quentity each food item
router.patch('/:id', updateCart)


module.exports = router