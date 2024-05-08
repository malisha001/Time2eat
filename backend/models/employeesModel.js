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

        },
        resId: {
            type: String,

        },
        leavetype: {
            type: String,

        },
        startDate: {
            type: String,

        },
        endDate: {
            type: String,

        },
        numofdate: {
            type: Number,
        },
    },{ timestamps: true }
)

module.exports = mongoose.model('Employee', employeeSchema)