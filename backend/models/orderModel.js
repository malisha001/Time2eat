const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({

    tableid:{


    },

    restaurantid:{



    },

    fooditems:{
       type: String,
       required: true


    },

    quantity:{
       type: Number,
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