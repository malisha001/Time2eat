const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookingSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Booking', BookingSchema)