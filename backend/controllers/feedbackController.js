const Feedback = require('../models/feedbackModel')
const mongoose = require('mongoose')

//get all feedbacks
const getFeedbacks = async (req , res) =>{
    const feedbacks = await Feedback.find({}).sort({createAt: -1})
    res.status(200).json(feedbacks)
}

// get a single feedback
const getFeedback = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Feedback'})
    }
    const feedback = await Feedback.findById(id)

    if(!feedback){
        return res.status(404).json({error : 'No such Feedback'})
    }
    res.status(200).json(feedback)
}

//add new feedback
const addFeedback = async(req , res) => {
    const{feedback_Id, customer_name, contact_number} = req.body
    try{
       const feedback = await Feedback.create({
        feedback_Id, customer_name, contact_number
       })
       res.status(200).json(feedback)
    }catch(error){
       res.status(400).json({error: error.message})
    }

}

//delete feedback
const deleteFeedback = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Feedback'})
    }
    const feedback = await Feedback.findByIdAndDelete({_id: id})

    if(!feedback){
        return res.status(404).json({error : 'No such Feedback'})
    }
    res.status(200).json(feedback)
}


//update restaurant
const updateFeedback = async(req , res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Feedback'})
    }
    const feedback = await Feedback.findByIdAndUpdate({_id: id},{
        ...req.body
    })
  
    if(!feedback){
        return res.status(404).json({error : 'No such Feedback'})
    }
    res.status(200).json(feedback)
}

module.exports = {
    getFeedback,
    getFeedbacks,
    addFeedback,
    updateFeedback,
    deleteFeedback
}