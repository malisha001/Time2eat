const {Timestamp} = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reOrderSchema = new Schema({
    reOrderItemName: {
        type:String,
        required: true
    },
    reOrderQuantity: {
        type:Number,
        required: true
    },
    reOrderAmount: {
        type:Number,
        required: true
    }
}, {Timestamp: true});


module.exports = mongoose.model('ReorderInventory', reOrderSchema ) 