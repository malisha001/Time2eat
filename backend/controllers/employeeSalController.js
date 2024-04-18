const EmployeeSal = require('../models/employeeSalaryModel')
const mongoose = require('mongoose')

//get all employees salaries
const getEmployeesSal = async(req,res) => {
    const employeesal = await EmployeeSal.find({})

    res.status(200).json(employeesal)
}

//get single employee salary
const getEmployeeSal = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    const employeesal = await EmployeeSal.findById()

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(employeesal)
}
//create employee salary
const createEmployeesSal = async(req,res) => {
    const{empId,resId,basicEmpSalary,bonusRate,empCatagory,taxRate,ETFrate,Fsalary} = req.body
    console.log(empCatagory)

    try{
        

        const employeesal = await EmployeeSal.create({empId,resId,basicEmpSalary,bonusRate,empCatagory,taxRate,ETFrate,Fsalary})
        res.status(200).json(employeesal)
    }catch(error){
        res.status(400).json({error: error.message})
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
    getEmployeeSal,
    createEmployeesSal,
    deleteEmployeeSal
}