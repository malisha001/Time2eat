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
<<<<<<< HEAD
    
    itemImage: {
        data: Buffer, 
        contentType: String 
=======
    itemImage: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
>>>>>>> c5da74e2c979fbf0bb7d96d7a0ac0e2cad7c7b50
    }
}, { timestamps: true });

<<<<<<< HEAD

}, {Timestamp: true})

module.exports = mongoose.model('Inventory', inventorySchema )
=======
module.exports = mongoose.model('Inventory', inventorySchema);
>>>>>>> c5da74e2c979fbf0bb7d96d7a0ac0e2cad7c7b50
