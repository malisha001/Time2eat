const express = require('express')
const router = express.Router()
const {
    getEmployeesleave,
    getEmployeeleave,
    createEmpLeave,
    updateEmpLeave
} = require('../Controllers/employeeLeaveController');

// get all employees leaves
router.get('/', getEmployeesleave);

// get a single employee leaves
router.get('/:id', getEmployeeleave);

// add employee leaves 
router.post('/', createEmpLeave);

// update employee leaves
router.patch('/:id', updateEmpLeave);

module.exports = router