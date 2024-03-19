const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({

    cartid:{},

    customerid:{},

    restaurantid:{},

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

    name:{
        type:String,
        required:true
    }

   
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)