const express = require('express');
const {
    getOnlinePayments,
    getOnlinePayment,
    createOnlinePayment,
    deleteOnlinePayments,
    updateOnlinePayments
} = require('../Controllers/onlinepaymentController');

const router = express.Router();

// GET all 
router.get('/', getOnlinePayments)

// GET a single  
router.get('/:id', getOnlinePayment)

// POST   
router.post('/', createOnlinePayment)

// DELETE 
router.delete('/:id', deleteOnlinePayments)

// UPDATE  
router.patch('/:id', updateOnlinePayments)

module.exports = router;