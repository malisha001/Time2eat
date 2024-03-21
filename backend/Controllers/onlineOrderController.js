const Onlineorder = require('../models/onlineOrderModel')
const mongoose = require('mongoose')

//show all orders to kitchen manager for each restaurent
const getOnlineOrders = async (req, res) => {
    const { id } = req.params;

    try {
        const resOrder = await Onlineorder.find({ restaurantid: id });

        if (!resOrder) {
            return res.status(404).json({ error: 'No online orders' });
        }
        res.status(200).json(resOrder);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
//show only delivery orders to riders
const getdeliveryOrders = async(req,res) =>{

    try {
        const deliveries = await Onlineorder.find({deliveryOpt: "delivery"});

        if (!deliveries) {
            return res.status(404).json({ error: 'Not yet delivery orders' });
        }
        res.status(200).json(deliveries);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//add online orders when customer confirm order
const addOnlineOrders = async (req, res) => {
    const {orderid,cusName,restaurantid,restaurantname,fooditem, location, quantity , price,paymentState, deliveryOpt} = req.body

    //add doc to database
    try {
        const onlineOrders = await Onlineorder.create({orderid,cusName,restaurantid,restaurantname,fooditem, location, quantity , price,paymentState, deliveryOpt })
        res.status(200).json(onlineOrders)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete automatically when rider accept order(not work)
const deleteOnlineOrders = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such cart'})
    }

    const onlineOrders = await Onlineorder.findOneAndDelete({_id: id})

    if (!onlineOrders) {
        return res.status(404).json({error: 'No such cart'})
    }

    res.status(200).json(cart)
}
module.exports = {
    getOnlineOrders,
    getdeliveryOrders,
    addOnlineOrders,
    deleteOnlineOrders
}