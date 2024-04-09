const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({

    orderid:{ //order id + restaurentId
        type: String,
        required:true
    },
    customerid:{
        type: String,
        required:true
    },
    cusName:{
        type: String,
        required:true
    },
    restaurantid:{
        type: String,
        required:true
    },
    restaurantname:{
        type: String,
        required:true
    },
    fooditem:{
       type: String,
       required:true
    },
    quantity:{
       type: Number,
       required:true
    },
    price:{
        type:Number,
        required:true
    },
   
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)