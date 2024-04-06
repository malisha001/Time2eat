const express = require('express')
const router = express.Router()
const {
    getEmpLeaves,
    getEmpLeave,
    createEmployeeLeaves,
    deleteEmployeeLeaves
} = require('../Controllers/empLeavesController');

// get all employees leaves
router.get('/', getEmpLeaves);

// get a single employee leaves
router.get('/:id', getEmpLeave);

// add employee leaves 
router.post('/', createEmployeeLeaves);

// update employee leaves
router.patch('/:id', deleteEmployeeLeaves);

module.exports = router