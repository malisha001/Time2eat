const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema(
    {
        empId: {
            type: String,
            require: true
        },
        empName: {
            type: String,
            require: true
        },
        position: {
            type: String,
            require: true
        },
        basicSalary: {
            type: Number,
            require: true
        },
        bonus: {
            type: Number,
            require: true
        },
        ETFcollection: {
            type: Number,
        },
        tax: {
            type: Number,
        },
        netSalary: {
            type: Number,
        }
    },{ timestamps: true }
)

module.exports = mongoose.model('Employee', employeeSchema)