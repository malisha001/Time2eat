const mongoose = require('mongoose')
const Schema = mongoose.Schema

const empmonthShema = new Schema({
    empId: {
        type: String,
        require: true
    },
    resId: {
        type: String,
    },
    basicEmpSalary: {
        type: Number,
        require: true
    },
    bonusRate: {
        type: Number,
    },
    leavePanalty: {
        type: Number,
    },
    taxRate: {
        type: Number,
    },
    ETFrate: {
        type: Number,

    },
    Fsalary: {
        type: Number,

    },
},{timestamps: true})

module.exports = mongoose.model('EmpmonthlySal',empmonthShema)