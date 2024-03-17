const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({

    cusid:{


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


    }

   
}, { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema)