const { default: mongoose } = require('mongoose');
const CustomerHistory = require('../models/CustomerHistory');

//get all Bookings
const getCustomerHistories = async (req, res) => {
    const customerhistories = await CustomerHistory.find({}).sort({createdAt: -1})
    res.status(200).json(customerhistories)
}

//get a single Bookings
const getCustomerHistory = async (req, res) => {
    const {id} = req.params

    const customerhistory = await CustomerHistory.findById(id)


    if (!customerhistory) {
        return res.status(404).json({error: 'No such CustomerHistory'})
    }

    res.status(200).json(customerhistory)
}

// create new booking
const createCustomerHistory = async (req, res) => {
    const {cusid, resid, name, time, couplequantity, groupquantity, telephoneno} = req.body

    // add doc to db
    try {
        const customerhistory = await CustomerHistory.create({cusid, resid, name, time, couplequantity, groupquantity, telephoneno})
        res.status(200).json(customerhistory)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteCustomerHistory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a CustomerHistory'})
    }

    const customerhistory = await CustomerHistory.findByIdAndDelete({_id: id})

    if (!customerhistory) {
        return res.status(404).json({error: 'No such a CustomerHistory'})
    }

    res.status(200).json(customerhistory)
}

//update a booking
const updateCustomerHistory = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a CustomerHistory'})
    }

    const customerhistory = await CustomerHistory.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!customerhistory) {
        return res.status(404).json({error: 'No such a CustomerHistory'})
    }

    res.status(200).json(customerhistory)
}

module.exports = {
    getCustomerHistories,
    getCustomerHistory,
    createCustomerHistory,
    deleteCustomerHistory,
    updateCustomerHistory
}