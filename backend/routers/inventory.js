const express = require('express')
const {createInvenotyItem,
       getInventoryItems,
       getInventoryItem,
       deleteInventoryItem,
       updateInventoryItem
} = require('../Controllers/inventoryControllers')


const router = express.Router()

// GET all inventory items
router.get('/', getInventoryItems)

// GET a SINGLE inventory item
router.get('/:id', getInventoryItem)

//POST a new inventory item
router.post('/', createInvenotyItem)

// DELETE an inventory item
router.delete('/:id', deleteInventoryItem)

// UPDATE an inventory item
router.patch('/:id', updateInventoryItem)


module.exports = router


