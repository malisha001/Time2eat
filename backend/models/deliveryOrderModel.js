const mongoose = require('mongoose')
const Schema = mongoose.Schema

//delivery packages
const deliverySchema = new Schema({
    orderId:{
        type:String,
        require: true
    },
    riderId:{
        type:String,
        require: true
    },
    riderName:{
        type:String,
        require: true
    },
    cusName: {
        type: String,
        require:true
    },
    restName: {
        type: String,
        require:true
    },
    totPrice:{
        type:Number,
        require: true
    },
    location:{
        type:String
    },
    distance:{
        type:Number
    },
    deliveryFee:{
        type:Number
    },
    orderStatus:{
        type:String
    },
    paymentState:{
        type:Boolean
    },
    estimateTime:{
        type:String
    }
})

// Define mongoose models based on schemas
module.exports = mongoose.model('Deliveryorder',deliverySchema)