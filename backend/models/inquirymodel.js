
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const InquirySchema = new Schema({
    inquiry_Id:{
        type: String,
        required : true
    },
    customer_name:{
        type:String,
        required : true
    },
    contact :{
        type:Number,
        required : true
    },
    email :{
        type:String,
        required : true
    },
    topic :{
        type:String,
        required : true
    },
    message :{
        type:String,
        required : true
    }
},{timestamps : true })

module.exports = mongoose.model('Inquiry',InquirySchema)