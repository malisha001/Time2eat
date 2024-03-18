const express = require('express')
const {
    getFeedback,
    getFeedbacks,
    addFeedback,
    deleteFeedback,
    updateFeedback
} = require('../controllers/feedbackController')

const router = express.Router()

//GET all Feedbacks
router.get('/', getFeedbacks)


//GET single Feedback
router.get('/:id', getFeedback)


//POST a new Feedbacks
router.post('/', addFeedback )
  

//DELETE a Feedbacks
router.delete('/:id', deleteFeedback)


//Update a Feedbacks
router.patch('/:id',updateFeedback)


module.exports = router;