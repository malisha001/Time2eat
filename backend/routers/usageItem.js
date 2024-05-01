const express = require('express')
const { createUsageItem,
        getUsageItems,
        updateUsageItem,
        deleteUsageItem,
        getAusageItem
} = require('../Controllers/usageFormController')

const router = express.Router()

// Post a new usageItem
router.post('/', createUsageItem)

// get all usage items
router.get('/', getUsageItems)

// update a usage item
router.patch('/:id', updateUsageItem)

// DELETE an inventory item
router.delete('/:id', deleteUsageItem)

// GET a SINGLE inventory item
router.get('/:id', getAusageItem)





module.exports = router