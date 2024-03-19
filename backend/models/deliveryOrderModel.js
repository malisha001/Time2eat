const mongoose = require('mongoose')
const Schema = mongoose.Schema

//delivery packages
const deliverySchema = new Schema({
    userId: {
        type: String,
        require:true
    },
    deliveryPersonId:{
        type: String
    },
    ordersId:{
        type:String,
        require: true
    },
    foodId:{
        type:String,
        require: true
    },
    foodName:{
        type:String,
        require: true
    },
    totPrice:{
        type:Number,
        require: true
    },
    deliveryFee:{
        type:Number,
    },
    orderStatus:{
        type:String,
    }
})

// Define mongoose models based on schemas
module.exports = mongoose.model('Deliveryorder',deliverySchema)