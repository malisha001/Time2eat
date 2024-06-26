const { default: mongoose } = require('mongoose');
const RealTimeBooking = require('../models/RealTimeModel');

//get all Bookings
const getRealTimeBookings = async (req, res) => {
    const RTbookings = await RealTimeBooking.find({}).sort({createdAt: -1})
    res.status(200).json(RTbookings)
}

//get a single Bookings
const getRealTimeBooking = async (req, res) => {
    const { id } = req.params;

    try {
        let RTbookings;

        // Check if the provided id is a MongoDB _id
        if (mongoose.Types.ObjectId.isValid(id)) {
            // If it is a valid MongoDB _id, find the booking(s) by _id
            RTbookings = await RealTimeBooking.findOne({ _id: id });
        } else {
            // If it's not a valid MongoDB _id, assume it's a resid and search by that
            RTbookings = await RealTimeBooking.find({ resid: id });
        }

        if (RTbookings.length === 0) {
            return res.status(404).json({ error: 'No such Booking' });
        }

        res.status(200).json(RTbookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


// create new booking
const createRealTimeBooking = async (req, res) => {
    const {cusid, resid, name, time, date, couplequantity, groupquantity, telephoneno} = req.body

    // add doc to db
    try {
        const RTbookings = await RealTimeBooking.create({cusid, resid, name, time, date, couplequantity, groupquantity, telephoneno})
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

    try {
        const deletedBooking = await RealTimeBooking.findByIdAndDelete(id)

        if (!deletedBooking) {
            return res.status(404).json({error: 'No such a Booking'})
        }

        res.status(200).json(deletedBooking)
    } catch (error) {
        console.error('Error deleting booking:', error)
        res.status(500).json({error: 'Internal server error'})
    }
}


//update a booking
const updateRealTimeBookings = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such a Booking' });
    }

    try {
        const updatedBooking = await RealTimeBooking.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ error: 'No such a Booking' });
        }

        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error('Error updating booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getRealTimeBookings,
    getRealTimeBooking,
    createRealTimeBooking,
    deleteRealTimeBookings,
    updateRealTimeBookings
}