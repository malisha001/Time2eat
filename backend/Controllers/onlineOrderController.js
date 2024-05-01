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

//show customer if accepted by rider
const getriderdetails = async(req,res) =>{
    const { id } = req.params;

    try {
        const rider = await Onlineorder.find({riderSelected: true, orderid: id});

        if (rider.length === 0) { // Check if rider array is empty
            return res.status(404).json({ error: 'No rider found' });
        }
        res.status(200).json(rider);

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

//update online orders when rider selected
const updateriderstatus = async(req,res) =>{
    const { id } = req.params;

    try {
        const rider = await Onlineorder.findOneAndUpdate({orderid: id}, { ...req.body });

        if (!rider) {
            return res.status(404).json({ error: 'no order found' });
        }
        res.status(200).json(rider);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//add online orders when customer confirm order
const addOnlineOrders = async (req, res) => {
    const {orderid,cusName,customerLocation,restaurantid,restaurantname, fooditem, reslocation , quantity,price, paymentState,deliveryOpt,riderSelected} = req.body

    //add doc to database
    try {
        const onlineOrders = await Onlineorder.create({orderid,cusName,customerLocation,restaurantid,restaurantname, fooditem, reslocation , quantity,price, paymentState,deliveryOpt,riderSelected })
        res.status(200).json(onlineOrders)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete online orders when rider not accepts the order
const deleteOnlineOrders = async (req, res) => {
    const {id} = req.params

    const onlineOrders = await Onlineorder.findOneAndDelete({orderid: id})

    if (!onlineOrders) {
        return res.status(404).json({error: 'No such cart'})
    }

    res.status(200).json(cart)
}
module.exports = {
    getriderdetails,
    getOnlineOrders,
    getdeliveryOrders,
    updateriderstatus,
    addOnlineOrders,
    deleteOnlineOrders
}