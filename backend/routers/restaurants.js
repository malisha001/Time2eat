const express = require('express')
const {
    addRestaurant,
    getRestaurant,
    getRestaurants,
    deleteRestaurant,
    updateRestaurant,
  
} = require('../controllers/restaurantController')

const router = express.Router()

//GET all Rstaurants
router.get('/', getRestaurants)


//GET single Restaurants
router.get('/:id', getRestaurant)


//POST a new Restaurant
router.post('/', addRestaurant )
  

//DELETE a Restaurant
router.delete('/:id', deleteRestaurant)


//Update a Restaurant
router.patch('/:id',updateRestaurant)



module.exports = router;
