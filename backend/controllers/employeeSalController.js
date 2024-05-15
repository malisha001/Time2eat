const EmployeeSal = require('../models/employeeSalaryModel')
const mongoose = require('mongoose')
const validator = require('validator');

//get all employees salaries
const getEmployeesSal = async(req,res) => {
    const { id } = req.params

    const employeesal = await EmployeeSal.find({resId:id})

    res.status(200).json(employeesal)
}

//get single employee salary
// const getEmployeeSal = async(req,res) =>{
//     const { id } = req.params

//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: 'no such directory'})
//     }

//     const employeesal = await EmployeeSal.findById()

//     if(!workout){
//         return res.status(404).json({error: 'No such workout'})
//     }
//     res.status(200).json(employeesal)
// }
//create employee salary
const createEmployeesSal = async(req,res) => {
    const{empId,resId,basicEmpSalary,bonusRate,empCatagory,taxRate,ETFrate,Fsalary} = req.body
    console.log(empCatagory)

    try{
                // Validate required fields
                if (!empId || !resId || !basicEmpSalary ) {
                    return res.status(400).json({ message: 'All fields are required' });
                    // throw new Error('All fields are required');
                }
        
                // Validate position contains only letters
                else if (!validator.isAlpha(empCatagory)) {
                    return res.status(400).json({ message: 'Position must contain only letters' });
                    // throw new Error('Position must contain only letters');
                }

        const employeesal = await EmployeeSal.create({empId,resId,basicEmpSalary,bonusRate,empCatagory,taxRate,ETFrate,Fsalary})
        return res.status(200).json(employeesal)
    }catch(error){
        return res.status(400).send({error: error.message})
    }
}

//delete employee salary
const deleteEmployeeSal = async(req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    const employeesal = await EmployeeSal.findOneAndDelete({_id: id})

    if(!employeesal){
        return res.status(404).json({error: 'no entries'})
    }
    
    res.status(200).json(employeesal)
}

module.exports = {
    getEmployeesSal,
    createEmployeesSal,
    deleteEmployeeSal
}