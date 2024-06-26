const { default: mongoose } = require('mongoose');
const Booking = require('../models/BookingModel');

//get all Bookings
const getBookings = async (req, res) => {
    const bookings = await Booking.find({}).sort({createdAt: -1})
    res.status(200).json(bookings)
}

// Function to get a single booking by MongoDB ObjectId
const getBookingById = async (req, res) => {
    const bookingId = req.params.id;
    

    try {
        let booking;
        if (mongoose.Types.ObjectId.isValid(bookingId)) {
            // If bookingId is a valid ObjectId, fetch by _id
            booking = await Booking.findById(bookingId);
        } else {
            console.log("hi res", bookingId)
            // If bookingId is not a valid ObjectId, treat it as resid and query by resid
            booking = await Booking.find({ resid: bookingId });
        }

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
};


//get a single Bookings
const getBooking = async (req, res) => {
    const {userId,restaurantId} = req.query;

    console.log("data",userId)
    const booking = await Booking.find({resid:restaurantId,cusid:userId})
    
    if (!booking) {
        return res.status(404).json({error: 'No such Booking'})
    }

    res.status(200).json(booking)
}

// create new booking
const createBooking = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: "Request body is empty" });
    }
    const {cusid,resid,name,time,date,couplequantity,groupquantity,telephoneno} = req.body

    // add doc to db
    try {
        const booking = await Booking.create({cusid, resid, name, time, date, couplequantity, groupquantity, telephoneno})
        res.status(200).json(booking)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteBooking = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a Booking'})
    }

    const booking = await Booking.findByIdAndDelete({_id: id})

    if (!booking) {
        return res.status(404).json({error: 'No such a Booking'})
    }

    res.status(200).json(booking)
}

//update a booking
const updateBooking = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a Booking'})
    }

    const booking = await Booking.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!booking) {
        return res.status(404).json({error: 'No such a Booking'})
    }

    res.status(200).json(booking)
}

module.exports = {
    getBookings,
    getBooking,
    getBookingById,
    createBooking,
    deleteBooking,
    updateBooking
}