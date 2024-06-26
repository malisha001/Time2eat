const mongoose = require('mongoose')

const Schema = mongoose.Schema

const onlinePaymentModel = new Schema({
    nameoncard: {
        type: String,
        required: true
        
    },
    bank: {
        type: String,
        required:true
    },
    branch: {
        type:String,
        required: true
    },
    cardno: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    cvv: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('OnlinePayment', onlinePaymentModel)