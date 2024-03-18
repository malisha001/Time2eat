const { default: mongoose } = require('mongoose');
const RealTimeBooking = require('../models/RealTimeModel');

//get all Bookings
const getRealTimeBookings = async (req, res) => {
    const RTbookings = await RealTimeBooking.find({}).sort({createdAt: -1})
    res.status(200).json(RTbookings)
}

//get a single Bookings
const getRealTimeBooking = async (req, res) => {
    const {id} = req.params

    const RTbookings = await RealTimeBooking.findById(id)


    if (!RTbookings) {
        return res.status(404).json({error: 'No such Booking'})
    }

    res.status(200).json(RTbookings)
}

// create new booking
const createRealTimeBooking = async (req, res) => {
    const {cusid, resid, name, time, couplequantity, groupquantity, telephoneno, availability} = req.body

    // add doc to db
    try {
        const RTbookings = await RealTimeBooking.create({cusid, resid, name, time, couplequantity, groupquantity, telephoneno, availability})
        res.status(200).json(RTbookings)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteRealTimeBookings = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a Booking'})
    }

    const RTbookings = await RTbookings.findByIdAndDelete({_id: id})

    if (!RTbookings) {
        return res.status(404).json({error: 'No such a Booking'})
    }

    res.status(200).json(RTbookings)
}

//update a booking
const updateRealTimeBookings = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a Booking'})
    }

    const RTbookings = await RTbookings.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!RTbookings) {
        return res.status(404).json({error: 'No such a Booking'})
    }

    res.status(200).json(RTbookings)
}

module.exports = {
    getRealTimeBookings,
    getRealTimeBooking,
    createRealTimeBooking,
    deleteRealTimeBookings,
    updateRealTimeBookings
}