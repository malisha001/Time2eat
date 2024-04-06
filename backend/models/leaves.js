const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LeaveSchema = new Schema({
    monthlyLeaves: {
        type: String,
        require: true
    },
    resId:{
        type: String,
        require: true
    },
    panaltyFee: {
        type: String,
        require: true
    }
},{timestamps: true})
module.exports = mongoose.model('EmpLeaves',LeaveSchema)