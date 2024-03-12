const express = require('express')

const router = express.Router()

//GET all Rstaurants
router.get('/', (req,res) => {
   res.json({mssg: 'Get all restaurants'})
})

//GET single Restaurants
router.get('/:id', (req, res) =>{
    res.json({mssg: 'Get a single single restaurant'})
})

//POST a new Restaurant
router.post('/', (req, res) => {
    res.json({mssg: 'Post a Restaurant'})
})

//DELETE a Restaurant
router.delete('/:id', (req, res) => {
    res.json({mssg: 'Delete a Restaurant'})
})

//Update a Restaurant
router.patch('/:id',(req, res) =>{
    res.json({mssg: 'Update a Restaurant'})
})


module.exports = router
