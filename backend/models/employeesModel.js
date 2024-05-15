const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema(
    {
        empId: {
            type: String,
            unique: true, // Make empId unique
            required: true 
        },
        empname: {
            type: String,
            required: true
        },
        position: {
            type: String,
            required: true
        },
        telnum: {
            type: Number,
            required: true
        },
    },{ timestamps: true }
)

module.exports = mongoose.model('Employee', employeeSchema)