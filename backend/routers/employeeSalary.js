const express = require('express')
const router = express.Router()
const Employeesal = require('../models/employeeSalaryModel')
const { model } = require('mongoose')
const {
    getEmployeeSal,
    getEmployeesSal,
    createEmployeesSal,
    deleteEmployeeSal
} = require('../controllers/employeeSalController')

//add salary employee
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