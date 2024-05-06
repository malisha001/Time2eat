const express = require('express')
const router = express.Router()
const { 
    getEmpPayrun,
    createEmpPayrun,
    updateEmpPayrun,
    getAllEmployeeSalaryData,
    monthlySalProcess
} = require('../Controllers/empPayrunController')

//get all employee slalary data
router.get('/allempsalaries', getAllEmployeeSalaryData)

// Get all employee payrun
router.get('/', getEmpPayrun)

//craete employee payrun
router.post('/', createEmpPayrun)

//create paysheet for monthlhy
router.get('/:id', monthlySalProcess)

// Update employee salary
router.patch('/:id', updateEmpPayrun)

// //get all employee slalary data
// router.get('/allempsalaries', getAllEmployeeSalaryData)

module.exports = router