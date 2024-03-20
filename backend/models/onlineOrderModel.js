const mongoose = require('mongoose')
const Schema = mongoose.Schema

const onlineOrdersSchema = new Schema({
    orderid:{ //order id + restaurentId + ordertime
        type: String,
        required:true
    },
    cusName:{
        type: String,
    },
    restaurantid:{
        type: String,
    },
    restaurantname:{
        type: String,
    },
    fooditem:{
        type: String,
        required:true
    },
    location:{
        type: String,
    },
    quantity:{
        type: Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    paymentState:{
        type:Boolean,
    },
    deliveryOpt:{    //select delivery option pickup or select rider
        type:String,
        required:true
    },
})

module.exports = mongoose.model('Onlineorder', onlineOrdersSchema)