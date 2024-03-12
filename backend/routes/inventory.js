const express = require('express')

const router = express.Router()

// GET all inventory Items
router.get('/', (req, res) => {
    res.json({mssg:'Get all inventory items'})
})

// Get a Single 
