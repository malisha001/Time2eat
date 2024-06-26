const express = require('express');
const {
    createBooking,
    getBookings,
    getBooking,
    getBookingById,
    deleteBooking,
    updateBooking
} = require('../Controllers/BookingController');

const router = express.Router();

// GET all Bookings
router.get('/', getBookings)

// GET a single Booking 
router.get('/books', getBooking)

router.get('/:id', getBookingById);

// POST a new Booking 
router.post('/', createBooking)

// DELETE a new Booking
router.delete('/:id', deleteBooking)

// UPDATE a new Booking
router.patch('/:id', updateBooking)

module.exports = router;