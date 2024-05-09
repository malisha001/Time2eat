const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    cusId:{
        type: String,
    },
    cusname:{
        type: String,
    },
    foodname:{
        type: String,
    },
    orderid:{
        type: String,
    },
    restaurantid:{
        type: String,
    },
    tprice:{
        type: Number,
    }
},{timestamps: true});
module.exports = mongoose.model('Cart',cartSchema)