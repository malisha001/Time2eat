const {Timestamp} = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const usageSchema = new Schema({
    usageItemName:{
        type: String,
        required: false
    },

    newQuantity:{
        type: Number,
        required: true
    },

    remainingQuant:{
        type:Number,
        required:true
    },

    Iquantity:{
        type:Number,
        required:true
    },
    Uprice:{
        type:Number,
        required:true
    }
    
}, {Timestamp: true})


module.exports = mongoose.model( 'usageInventory', usageSchema)
