const mongoose = require('mongoose');

// Define a new Mongoose schema
const Schema = mongoose.Schema;

// Define the schema for Advertisement
const advertisementSchema = new Schema({
    restaurantid: {
        type: String,
        required: true
    },
    restaurantname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        }
    }
}, { timestamps: true }); // Add timestamps for createdAt and updatedAt

// Export the Advertisement model
module.exports = mongoose.model('Advertisement', advertisementSchema);
