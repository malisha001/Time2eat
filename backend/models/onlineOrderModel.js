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
    customerLocation:{
        type: String,
    },
    restaurantid:{
        type: String,
    },
    restaurantname:{
        type: String,
    },
    reslocation:{
        type: String,
    },
    fooditem:{
        type: String,

    },
    quantity:{
        type: Number,

    },
    price:{
        type:Number,

    },
    paymentState:{
        type:Boolean,
    },
    deliveryOpt:{    //select delivery option pickup or select rider
        type:String,
        required:true
    },
    riderSelected:{
        type:Boolean,
    },
})

module.exports = mongoose.model('Onlineorder', onlineOrdersSchema)