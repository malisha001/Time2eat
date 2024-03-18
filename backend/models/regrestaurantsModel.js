const mongoose = require('mongoose')

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    Restaurant_Id:{
        type: String,
        required : true
    },
    Restaurant_name:{
        type:String,
        required : true
    },
    contact :{
        type:Number,
        required : true
    }
},{timestamps : true })

module.exports = mongoose.model('Restaurant',restaurantSchema)