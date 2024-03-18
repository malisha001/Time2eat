const express = require('express');
const {
    getCustomerHistories,
    getCustomerHistory,
    createCustomerHistory,
    deleteCustomerHistory,
    updateCustomerHistory
} = require('../controllers/CustomerHistoryController');

const router = express.Router();

// GET all 
router.get('/', getCustomerHistories)

// GET a single  
router.get('/:id', getCustomerHistory)

// POST   
router.post('/', createCustomerHistory)

// DELETE 
router.delete('/:id', deleteCustomerHistory)

// UPDATE  
router.patch('/:id', updateCustomerHistory)

module.exports = router;