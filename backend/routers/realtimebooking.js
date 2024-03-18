const express = require('express');
const {
    getRealTimeBookings,
    getRealTimeBooking,
    createRealTimeBooking,
    deleteRealTimeBookings,
    updateRealTimeBookings
} = require('../controllers/RealTimeBookingControler');

const router = express.Router();

// GET all Bookings
router.get('/', getRealTimeBookings)

// GET a single Booking 
router.get('/:id', getRealTimeBooking)

// POST a new Booking 
router.post('/', createRealTimeBooking)

// DELETE a new Booking
router.delete('/:id', deleteRealTimeBookings)

// UPDATE a new Booking
router.patch('/:id', updateRealTimeBookings)

module.exports = router;