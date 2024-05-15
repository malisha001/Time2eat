const express = require('express');
const router = express.Router();
const { 
    getEmpPayrun,
    createEmpPayrun,
    updateEmpPayrun,
    getAllEmployeeSalaryData,
    monthlySalProcess,
    getLastUpdate
} = require('../Controllers/empPayrunController');

// Get all employee payrun
router.get('/', getEmpPayrun);

// Create employee payrun
// router.post('/', createEmpPayrun);

// Update employee salary
router.patch('/:id', updateEmpPayrun);

// Get last update
router.get('/lastupd', getLastUpdate);

// Get paysheet for a specific month and specific employee
router.get('/paysalary/:id', monthlySalProcess);

// Get all employee salary data
router.get('/allempsalaries/:id', getAllEmployeeSalaryData);

module.exports = router;
