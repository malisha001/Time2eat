const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dineinorderSchema = new Schema({

    orderid:{},

    tableid:{
        type: String,
        required: true

    },

    restaurantid:{
        type: String,
       required: true

    },

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

module.exports = mongoose.model('dineinorder', dineinorderSchema)