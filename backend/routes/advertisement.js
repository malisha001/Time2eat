//this is for register different routes
//end points for the api running
const express = require('express')

const {
    createAdvertisement,
    getAdvertisement,
    getAdvertisements,
    deleteAdvertisement,
    updateAdvertisement,
} = require('../controllers/advertisementController')

const router = express.Router()

//GET all advertisements
router.get('/', getAdvertisements)

//GET a single advertisement
router.get('/:id', getAdvertisement)

//POST a new advertisement
router.post('/', createAdvertisement)

//DELETE a advertisement
router.delete('/:id', deleteAdvertisement)

//UPDATE a advertisement
router.patch('/:id', updateAdvertisement)

module.exports =router