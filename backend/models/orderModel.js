const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({

    orderid:{},

    tableid:{},

    restaurantid:{},

    fooditem:{
       type: String,
       required: true
    },

    quantity:{
       type: Number,
       required:true
    },

    name:{
       type: String,
       required:true
    },

    price:{
        type:Number,
        required:true
    },

    state:{
        type:String,
        required:true
    }


}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)