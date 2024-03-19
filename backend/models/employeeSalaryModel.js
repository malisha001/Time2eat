const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
    empId: {
        type: String,
        require: true
    },
    resId: {
        type: String,
        require: true
    },
    basicEmpSalary: {
        type: Number,
        require: true
    },
    bonusRate: {
        type: Number,
        require: true
    },
    empCatagory: {
        type: String,
        require: true
    },
    taxRate: {
        type: Number,
        require: true
    },
    ETFrate: {
        type: Number,
        require: true
    },
    Fsalary: {
        type: Number,
        require: true
    },
},{timestamps: true})

module.exports = mongoose.model('Employeesalary',employeeSchema)