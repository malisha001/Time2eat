const Leaves = require('../models/leaves')
const mongoose = require('mongoose')

//get leaves for each restuarents
const getLeaves = async(req,res) => {
    const leaves = await Leaves.find({})
    res.status(200).json(leaves)
}

//create leaves for each restuarents
const createLeaves = async(req,res) => {
    const{monthlyLeaves,resId,panaltyFee} = req.body

    try{
        const leaves = await Leaves.create({monthlyLeaves,resId,panaltyFee})
        res.status(200).json(leaves)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//update leaves for each restuarents
const updateLeaves = async(req,res) => {
    const {id:_id} = req.params
    const leaves = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No such directory')
    }

    const updatedLeaves = await Leaves.findByIdAndUpdate(_id,{...leaves,_id},{new:true})

    res.json(updatedLeaves)
}

module.exports = {
    getLeaves,
    createLeaves,
    updateLeaves
}