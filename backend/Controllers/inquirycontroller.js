const Inquiry = require('../models/inquirymodel')
const mongoose = require('mongoose')

//get all inquiries
const getinquiries = async (req , res) =>{
    const inquiries = await Inquiry.find({}).sort({createAt: -1})
    res.status(200).json(inquiries)
}

// get a single inquiry
const getInquiry = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Inquiry'})
    }
    const inquiry = await Inquiry.findById(id)

    if(!inquiry){
        return res.status(404).json({error : 'No such Inquiry'})
    }
    res.status(200).json(inquiry)
}

//add new inquiry
const addInquiry = async(req , res) => {
    const{inquiry_Id, customer_name, contact,email,topic,message} = req.body
    try{
       const inquiry = await Inquiry.create({
        inquiry_Id, customer_name, contact,email,topic,message
       })
       res.status(200).json(inquiry)
    }catch(error){
       res.status(400).json({error: error.message})
    }

}

//delete inquiry
const deleteInquiry = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Inquiry'})
    }
    const inquiry = await Inquiry.findByIdAndDelete({_id: id})

    if(!inquiry){
        return res.status(404).json({error : 'No such Inquiry'})
    }
    res.status(200).json(inquiry)
}


//update restaurant
const updateInquiry = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Inquiry'})
    }
    const inquiry = await Inquiry.findByIdAndUpdate({_id: id},{
        ...req.body
    })
  
    if(!inquiry){
        return res.status(404).json({error : 'No such Inquiry'})
    }
    res.status(200).json(inquiry)
}

module.exports = {
    getInquiry,
    getInquirys,
    addInquiry,
    updateInquiry,
    deleteInquiry
}