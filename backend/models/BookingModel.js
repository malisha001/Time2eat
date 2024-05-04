const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BookingSchema = new Schema({
    
    cusid: {
        type: String,
       
    },
    resid: {
        type: String,
        
    },
    name: {
        type:String,
        required: true
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
        required: true
    },
    
}, { timestamps: true })

module.exports = mongoose.model('Booking', BookingSchema)