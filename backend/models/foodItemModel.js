const mongoose = require('mongoose')

const Schema = mongoose.Schema

const FoodItemSchema = new Schema(
    {
      
        name: {type: String, required: true},
        price: { type:Number, required: true },
        tags: { type: [String] },
        favourite: { type: Boolean , default: false},
        stars: { type: Number, default: 3},
        imageUrl: {type: String, required: true},
        origins: { type: [String], required: true},
        cookTime : { type: String, required: true},

    },

    {
        
        timestamps: true,
    }
    );

    
    module.exports = mongoose.model('fooditem', FoodItemSchema);



