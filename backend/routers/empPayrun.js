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
router.post('/', createEmpPayrun);

// Update employee salary
router.patch('/:id', updateEmpPayrun);

// Get all employee salary data
router.get('/allempsalaries', getAllEmployeeSalaryData);

// Get paysheet for a specific month
router.get('/:id', monthlySalProcess);

// Get last update
router.get('/lastupdateee', getLastUpdate);

module.exports = router;
