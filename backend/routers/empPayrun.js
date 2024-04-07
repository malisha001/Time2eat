const express = require('express')
const router = express.Router()
const { 
    getEmpPayrun,
    createEmpPayrun,
    updateEmpPayrun,
    monthlySalProcess
} = require('../Controllers/empPayrunController')

// Get all employee payrun
router.get('/', getEmpPayrun)

//craete employee payrun
router.post('/', createEmpPayrun)

//create paysheet for monthlhy
router.get('/:id', monthlySalProcess)

// Update employee salary
router.patch('/:id', updateEmpPayrun)



module.exports = router