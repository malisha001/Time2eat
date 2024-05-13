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

    },
    riderName:{
        type:String,

    },
    cusName: {
        type: String,
        require:true
    },
    customerLocation:{
        type:String
    },
    restaurantname: {
        type: String,
        require:true
    },
    reslocation:{
        type:String
    },
    price:{
        type:Number,
        require: true
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
    orderstate:{
        type:String
    },
    estimatetime:{
        type:Number
    }
})

// Define mongoose models based on schemas
module.exports = mongoose.model('Deliveryorder',deliverySchema)