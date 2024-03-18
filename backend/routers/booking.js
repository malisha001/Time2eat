const express = require('express');
const {
    createBooking,
    getBookings,
    getBooking,
    deleteBooking,
    updateBooking
} = require('../controllers/BookingController');

const router = express.Router();

// GET all Bookings
router.get('/', getBookings)

// GET a single Booking 
router.get('/:id', getBooking)

// POST a new Booking 
router.post('/', createBooking)

// DELETE a new Booking
router.delete('/:id', deleteBooking)

// UPDATE a new Booking
router.patch('/:id', updateBooking)

module.exports = router;