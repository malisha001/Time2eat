const express = require('express')

   
const { getFooditems,
        getFooditem,
        addFooditem,
        deleteFooditem,
        updateFooditem
     } = require('../controllers/fooditemsController')

const router = express.Router()

//GET all Rstaurants
router.get('/', getFooditems)


//GET single Restaurants
router.get('/:id', getFooditem)


//POST a new Restaurant
router.post('/', addFooditem )
  

//DELETE a Restaurant
router.delete('/:id', deleteFooditem)


//Update a Restaurant
router.patch('/:id',updateFooditem)


module.exports = router;
