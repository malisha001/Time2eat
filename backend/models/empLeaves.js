const mongoose = require('mongoose')
const Schema = mongoose.Schema

const leavesShaschema = new Schema({
    empId: {
        type: String,
        require: true
    },
    resId:{
        type: String,
        require: true
    },
    empName: {
        type: String,
        require: true
    },
    leaveType: {
        type: String,
        require: true
    },
    leaveDays: {
        type: Number,
        require: true
    },
    leaveDate: {
        type: Date,
        require: true
    },
},{timestamps: true})
module.exports = mongoose.model('EmpLeaves',leavesShaschema)