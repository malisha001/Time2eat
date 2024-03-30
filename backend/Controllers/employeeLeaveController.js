const EmployeeLeave = require('../models/employeeLeavesModel')
const mongoose = require('mongoose')

//get all employees leaves
const getEmployeesleave = async(req,res) => {
    const employeeleave = await EmployeeLeave.find({})

    res.status(200).json(employeeleave)
}

//get single employee leaves
const getEmployeeleave = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    const empleaves = await EmployeeLeave.findById(id)

    if(!empleaves){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(empleaves)
}

//create employee salary
const createEmpLeave = async(req,res) => {
    const{title,load,reps} = req.body

    try{
        const empleaves = await EmployeeLeave.create({title,load,reps})
        res.status(200).json(EmployeeLeave)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//update employee leaves
const updateEmpLeave = async(req,res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    const empleaves = await EmployeeLeave.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!empleaves){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(EmployeeLeave)
}

module.exports = {
    getEmployeesleave,
    getEmployeeleave,
    createEmpLeave,
    updateEmpLeave
}