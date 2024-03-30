const express = require('express')
const router = express.Router()
const {
    getEmployeeSal,
    getEmployeesSal,
    createEmployeesSal,
    deleteEmployeeSal
} = require('../Controllers/employeeSalController')

//get salary employee
router.get('/',getEmployeesSal)

//get single employee details
router.get('/:id',getEmployeeSal)

//add salary for new users
router.post('/',createEmployeesSal)

//delete employee salary
router.delete('/:id',deleteEmployeeSal)

//update salaries
// router.patch('/:id',updateEmployeeSal)

module.exports = router