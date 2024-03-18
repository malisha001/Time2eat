const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    itemId: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    itemPrice: {
        type: Number,
        required: true
    },
    itemCategory: {
        type: String,
        required: true
    },
    itemImage: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
    }
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
