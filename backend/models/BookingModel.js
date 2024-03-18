const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookingSchema = new Schema({
    
    cusid: {
        type: String,
        required: false
    },
    resid: {
        type: String,
        required: false
    },
    name: {
        type:String,
        required: false
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    couplequantity: {
        type: Number,
        required: true
    },
    groupquantity: {
        type: Number,
        required: true
    },
    telephoneno: {
        type: Number,
        required: false
    },
    
}, { timestamps: true })

module.exports = mongoose.model('Booking', BookingSchema)