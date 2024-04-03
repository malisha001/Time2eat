const mongoose = require('mongoose')

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    Restaurant_Id:{
        type: String, 
        required:true
    },
    Restaurant_licensenumber:{
        type:String,
        required:true
    },
    Restaurant_name:{
        type:String,
        required : true
    },
    Restaurant_Managersname:{
        type:String,
        required : true
    },
    Email_address:{
        type:String,
        required : true
    },
    contact :{
        type:Number,
        required : true
    },
    Password:{
        type:String,
        required : true
    },
     Confirm_paasword:{
        type:String,
        required : true
    },
    Address:{
        type:String,
        required : true
    },
    Couple_table:{
        type:Number,
        required : true
    },
    Group_table:{
        type:Number,
        required : true
    }
},{timestamps : true })

module.exports = mongoose.model('Restaurant',restaurantSchema)