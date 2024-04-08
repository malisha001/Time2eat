const express = require('express')
const {
    getFeedback,
    getFeedbacks,
    addFeedback,
    deleteFeedback,
    updateFeedback
} = require('../Controllers/feedbackController')

const router = express.Router()

//GET all Feedbacks
router.get('/', getFeedbacks)

//POST a new Feedbacks
router.post('/', addFeedback )

//GET single Feedback
router.get('/:id', getFeedback)  

//DELETE a Feedbacks
router.delete('/:id', deleteFeedback)


//Update a Feedbacks
router.patch('/:id',updateFeedback)


module.exports = router;