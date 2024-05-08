const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const { OrderStatus } = require('../src/constants/orderStatus.js');
const FoodModel = require('./foodModel.js');


const OrderItemSchema = new Schema(
    {

        food: { type: FoodModel.schema, required: true},
        price: {type: Number, required: true},
        quantity: { type:Number, required: true},
    },
    {
        _id: false,
    }
);

OrderItemSchema.pre('validate', function (next) {
    this.price = this.food.price * this.quantity;
    next();
});

const orderSchema = new Schema(
    {

    fullname: { type: String, required: true },
    address: { type: String, required: true },
    /*addressLatLng: { type: LatLngSchema, required: true }, */
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    items: { type: [OrderItemSchema], required: true },
    status: { type: String, default: OrderStatus.NEW },
    user: { type: Schema.Types.ObjectId, required: true },
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
  }
);

    


module.exports = mongoose.model('order', orderSchema);
