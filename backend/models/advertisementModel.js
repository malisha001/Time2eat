// Define the schema for Advertisement
const mongoose = require('mongoose')

//function to create a new schema
const Schema = mongoose.Schema

//Schema defines the structure of the documents we saved in that collection
const advertisementSchema = new Schema({
    adTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    offerType: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    user_id: {
        type: String,
        required : true
    }
}, { timestamps: true }) // Add timestamps for createdAt and updatedAt

// Export the Advertisement model
//use the model to interact with the collection with that name
module.exports = mongoose.model('Advertisement', advertisementSchema)
