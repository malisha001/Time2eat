const mongoose = require('mongoose')

const Schema = mongoose.Schema

const onlinePaymentModel = new Schema({
    nameoncard: {
        type: String,    
    },
    bank: {
        type: String,
    },
    branch: {
        type:String,
    },
    cardno: {
        type: String,
    },
    date: {
        type: String,
    },
    cvv: {
        type: Number,
    },
    dfee: {
        type: Number,
    },
    pakprice: {
        type: Number,
    },
    tpayment: {
        type: Number,
    },
}, { timestamps: true })

module.exports = mongoose.model('OnlinePayment', onlinePaymentModel)