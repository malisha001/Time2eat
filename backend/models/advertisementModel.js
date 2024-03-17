const mongoose =require('mongoose')

//function to create a new schema
const Schema = mongoose.Schema

//Schema defines the structure of the documents we saved in that collection
const advertisementSchema = new Schema({
    restaurantid: {
        
    },
    restaurantname:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    duration:{
        type: TimeRanges,
        required: true
    }
},{ timestamp: true })

//use the model to interact with the collection with that name

module.exports = mongoose.model('Advertisement',advertisementSchema)
