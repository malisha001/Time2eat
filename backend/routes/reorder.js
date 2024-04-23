const express = require('express')
const {    getReorderItems,
    getReorderItem,
    createReorderItem,
    deleteReorderItem,
    updateReorderItem
} = require('../Controllers/inventoryReorderController')

const router = express.Router()


// GET all reorder items
router.get('/', getReorderItems)

// GET a SINGLE reorder item
router.get('/:id', getReorderItem)

//POST a new reorder item
router.post('/', createReorderItem)

// DELETE an reorder item
router.delete('/:id', deleteReorderItem)

// UPDATE an reorder item
router.patch('/:id', updateReorderItem)

module.exports = router