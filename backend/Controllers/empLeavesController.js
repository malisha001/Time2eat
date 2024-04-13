const Empleaves = require('../models/employeesModel')
const mongoose = require('mongoose')

//get all leaves
const getEmpLeaves = async(req,res) => {
    const empleaves = await Empleaves.find({})
    res.status(200).json(empleaves)
}
//get single employee leaves
const getEmpLeave = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    const empleave = await Empleaves.findById()

    if(!empleave){
        return res.status(404).json({error: 'No such leave'})
    }
    res.status(200).json(empleave)
}

//create employee salary
const createEmployeeLeaves = async(req,res) => {
    const{empId,resId,empName,leaveType,leaveDays,leaveDate} = req.body

    try{
        const empleave = await Empleaves.create({empId,resId,empName,leaveType,leaveDays,leaveDate})
        res.status(200).json(empleave)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete employee leaves
const deleteEmployeeLeaves = async(req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    const empleave = await Empleaves.findOneAndDelete({_id: id})

    if(!empleave){
        return res.status(404).json({error: 'no entries'})
    }
    res.status(200).json(empleave)
}
module.exports = {
    getEmpLeaves,
    getEmpLeave,
    createEmployeeLeaves,
    deleteEmployeeLeaves
}