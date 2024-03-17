const mongoose = require('mongoose')

const Schema = mongoose.Schema

const feedbackSchema = new Schema({
    feedback_Id:{
        type: String,
        required : true
    },
    customer_name:{
        type:String,
        required : true
    },
    contact_number :{
        type:Number,
        required : true
    }
},{timestamps : true })

module.exports = mongoose.model('Feedback',feedbackSchema)
