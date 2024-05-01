const {Timestamp} = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const usageSchema = new Schema({
    usageItemName:{
        type: String,
        required: false
    },

    initialQuantity:{
        type: Number,
        required: true
    },

    newQuantity:{
        type: Number,
        required: true
    }

    
}, {Timestamp: true})


module.exports = mongoose.model( 'usageInventory', usageSchema)
