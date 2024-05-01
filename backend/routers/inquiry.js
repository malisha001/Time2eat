const express = require('express')
const {
    getinquiries,
    getInquiry,
    addInquiry,
    deleteInquiry,
    updateInquiry
} = require('../Controllers/inquirycontroller')

const router = express.Router()

//GET all inquiries
router.get('/', getinquiries)


//GET single inquiry
router.get('/:id', getInquiry)


//POST a new inquiry
router.post('/', addInquiry )
  

//DELETE a inquiry
router.delete('/:id', deleteInquiry)


//Update a inquiry
router.patch('/:id',updateInquiry)


module.exports = router;