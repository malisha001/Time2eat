const EmpPayrun = require('../models/empPayrunModel')
const mongoose = require('mongoose')

//get all employees leaves
const getEmpPayrun = async(req,res) => {
    const payrun = await EmpPayrun.find({})

    res.status(200).json(payrun)
}
//create employee payrun
const createEmpPayrun = async(req,res) => {
    const {category,rate,runPeriod} = req.body

    try {
        const payrun = await EmpPayrun.create({category,rate,runPeriod})
        res.status(201).json(payrun)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

//update employee payrun
const updateEmpPayrun = async(req,res)=>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such directory'})
    }

    const payrun = await EmpPayrun.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!payrun){
        return res.status(404).json({error: 'No such workout'})
    }
    res.status(200).json(payrun)
}

module.exports = {
    getEmpPayrun,
    createEmpPayrun,
    updateEmpPayrun
}