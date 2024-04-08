const express = require('express')
const {
    getinquiries,
    getInquiry,
    addInquiry,
    deleteInquiry,
    updateInquiry
} = require('../Controllers/inquirycontroller')

const router = express.Router()

//GET all Feedbacks
router.get('/', getinquiries)


//GET single Feedback
router.get('/:id', getInquiry)


//POST a new Feedbacks
router.post('/', addInquiry )
  

//DELETE a Feedbacks
router.delete('/:id', deleteInquiry)


//Update a Feedbacks
router.patch('/:id',updateInquiry)


module.exports = router;