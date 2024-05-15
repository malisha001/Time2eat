const express = require('express');
const router = express.Router();
const { 
    getAllEmployees, 
    getEmployeeById, 
    createEmployee, 
    updateEmployee,
    deleteEmployee 
} = require('../Controllers/employeeController');

// Get all employee details
router.get('/:id', getAllEmployees);

// Create a new employee
router.post('/', createEmployee);

// Delete an employee
router.delete('/:id', deleteEmployee);

// Update an employee
router.patch('/:id', updateEmployee);

module.exports = router;