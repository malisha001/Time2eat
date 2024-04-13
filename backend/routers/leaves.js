const express = require('express')
const router = express.Router()

const {
    getLeaves,
    createLeaves,
    updateLeaves
} = require('../Controllers/LeavesController');

//get leaves details for each restuarents
router.get('/', getLeaves);

//create leaves for each restuarents
router.post('/', createLeaves);

//update leaves for each restuarents
router.patch('/:id', updateLeaves);

module.exports = router