const express = require('express')
const router = express.Router()
const { 
    getEmpPayrun,
    createEmpPayrun,
    updateEmpPayrun
} = require('../Controllers/empPayrunController')

// Get all employee payrun
router.get('/', getEmpPayrun)

//craete employee payrun
router.post('/', createEmpPayrun)

// Update employee salary
router.patch('/:id', updateEmpPayrun)

module.exports = router