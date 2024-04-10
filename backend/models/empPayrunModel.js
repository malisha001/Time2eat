const mongoose = require('mongoose')
const Schema = mongoose.Schema

const empPayrunSchema = new Schema(
    {
        category: {
            type: String,
            require: true
        },
        rate: {
            type: Number,
            require: true
        },
        runPeriod: {
            type: String,
            require: true
        },
    },{ timestamps: true })

module.exports = mongoose.model('EmployeePayrun', empPayrunSchema)