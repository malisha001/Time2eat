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

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//fire the middleware function before anything else to ensure the security 
//require auth for all workout routes
router.use(requireAuth)

//GET all Advertisement
router.get('/', getAdvertisements)

//GET a single Advertisement
router.get('/:id', getAdvertisement)

//POST a new Advertisement
router.post('/', createAdvertisement)

//DELETE a Advertisement
router.delete('/:id', deleteAdvertisement)

//UPDATE a Advertisement
router.patch('/:id', updateAdvertisement)

module.exports =router
