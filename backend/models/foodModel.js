const mongoose = require('mongoose')
const {Timestamp} = require('mongodb')
const Schema = mongoose.Schema

const FoodSchema = new Schema(
    {
      
        name: {type: String, required: true},
        cookTime : { type: String, required: true},
        price: { type:Number, required: true },
        favourite: { type: Boolean , default: false},
        origins: { type: [String], required: true},
        stars: { type: Number, default: 3},
        imageUrl: {type: String, required: true},
        tags: { type: [String] },
        

    },
    {
    toJSON: {
        virtuals: true,
    },
    toObject:{
        virtuals:true,
    },
    timestamps: true,
}
    );

    const FoodModel = mongoose.model('food', FoodSchema); 
    
    module.exports = FoodModel;


