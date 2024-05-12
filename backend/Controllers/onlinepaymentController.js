const { default: mongoose } = require('mongoose');
const OnlinePayment = require('../models/onlinePaymentModel');

//get all onlinepay
const getOnlinePayments = async (req, res) => {
    const onlinepayments = await OnlinePayment.find({}).sort({createdAt: -1})
    res.status(200).json(onlinepayments)
}

//get a single onlinepay
const getOnlinePayment = async (req, res) => {
    const {id} = req.params

    const onlinepayment = await OnlinePayment.findById(id)


    if (!onlinepayment) {
        return res.status(404).json({error: 'No such OnlinePayment'})
    }

    res.status(200).json(onlinepayment)
}

// create new booking
const createOnlinePayment = async (req, res) => {
    const {nameoncard, bank, branch, cardno, date, cvv,dfee,pakprice,tpayment} = req.body

    // add doc to db
    try {
        const onlinepayment = await OnlinePayment.create({nameoncard, bank, branch, cardno, date, cvv,dfee,pakprice,tpayment})
        res.status(200).json(onlinepayment)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteOnlinePayments = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a OnlinePayment'})
    }

    const onlinepayment = await OnlinePayment.findByIdAndDelete({_id: id})

    if (!onlinepayment) {
        return res.status(404).json({error: 'No such a OnlinePayment'})
    }

    res.status(200).json(onlinepayment)
}

//update a booking
const updateOnlinePayments = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such a OnlinePayment'})
    }

    const onlinepayment = await OnlinePayment.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if (!onlinepayment) {
        return res.status(404).json({error: 'No such a OnlinePayment'})
    }

    res.status(200).json(onlinepayment)
}

module.exports = {
    getOnlinePayments,
    getOnlinePayment,
    createOnlinePayment,
    deleteOnlinePayments,
    updateOnlinePayments
}