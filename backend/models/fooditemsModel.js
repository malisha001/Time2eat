const mongoose = require('mongoose')

const Schema = mongoose.Schema

const fooditemSchema = new Schema({
    Item_id:{
        type: String,
        required : true
    },
    Item_name:{
        type: String,
        required : true
    },
    catagory:{
        type:String,
        required : true
    },
    Price :{
        type:String,
        required : true
    },
    Cost :{
        type:String,
    
    },
    Profit :{
        type:String,
    },
    Average_preparetime:{
        type:String,
        required : true
    }
},{timestamps : true })

module.exports = mongoose.model('Fooditem',fooditemSchema)