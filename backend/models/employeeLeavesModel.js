const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeLeaves = new Schema({
    empId:{
        type: String,
        require: true
    },
    empName:{
        type: String,
        require: true
    },
    resId:{
        type: String,
        require: true
    },
    leaves:{
        type: String,
        require: true
    },
    reason:{
        type: String,
        require: true
    },
    startDate:{
        type: String,
        require: true
    },
    endDate:{
        type: String,
        require: true
    },
})