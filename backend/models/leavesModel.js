const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LeaveSchema = new Schema({
    monthlyLeaves: {
        type: Number,
        require: true
    },
    resId:{
        type: String,
        require: true
    },
    panaltyFee: {
        type: Number,
        require: true
    }
},{timestamps: true})
module.exports = mongoose.model('Leaves',LeaveSchema)