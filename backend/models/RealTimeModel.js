const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RealTimeSchema = new Schema({
    cusid: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    resid: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('RealTimeBooking', RealTimeSchema)