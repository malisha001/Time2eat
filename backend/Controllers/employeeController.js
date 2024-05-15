const Employee = require('../models/employeesModel');
const mongoose = require('mongoose')
const validator = require('validator')

// get all employee details
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({resId:req.params.id});
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//insert emplopyee details
const createEmployee = async (req, res) => {
    const{empId,resId,empname,position,telnum} = req.body

    try {
        // Validate required fields
        if (!empId || !resId || !empname || !telnum ) {
            return res.status(400).json({ message: 'All fields are required' });
            // throw new Error('All fields are required');
        }
        // Validation patterns
        const alphanumericPattern = /^[a-zA-Z0-9]+$/;
        const numericPattern = /^[0-9]+$/;

        // Validate empId, resId, and empname
        if (!alphanumericPattern.test(empId) || !alphanumericPattern.test(resId) || !alphanumericPattern.test(empname)) {
            return res.status(400).json({ message: 'empId, resId, and empname should contain only letters and numbers' });
        }

        // Validate telnum
        if (!numericPattern.test(telnum)) {
            return res.status(400).json({ message: 'telnum should contain only numbers' });
        }

        const employee = await Employee.create({empId,resId,empname,position,telnum})
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//update employee details
const updateEmployee = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(workout)
    
};

//delete employee details
const deleteEmployee = async (req, res) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    try {
        const employee = await Employee.findByIdAndDelete({_id: id});

        if(!employee){
            return res.status(404).json({error: 'no entries'})
        }

        res.json({ message: 'Employee deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Export controller functions
module.exports = {
    getAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};