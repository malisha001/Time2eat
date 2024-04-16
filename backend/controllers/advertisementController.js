//contain controller functions
const { default: mongoose } = require('mongoose')
const Advertisement = require('../models/advertisementModel')


//Get all Advertisements
const getAdvertisements = async(req,res) =>{
    const advertisements = await Advertisement.find({}).sort({createAt: -1})

    res.status(200).json(advertisements)
}


//Get a single Advertisement
const getAdvertisement = async(req,res) => {
    const{ id } = req.params

    //check if the id added is valid
   if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such id'})
    }

    const advertisement = await Advertisement.findById(id)

     //check if there is such advertisement
    if(!advertisement){
        return res.status(404).json({error: 'No such advertisement'}) 
    }
    res.status(200).json(advertisement)
}

//Create new advertisement
const createAdvertisement = async(req,res) =>{
    const {restaurantid,restaurantname,description, duration} = req.body

    // add doc to db
    try{
        const advertisement = await Advertisement.create({restaurantid,restaurantname,description, duration})
        res.status(200).json(advertisement)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}


//Delete a advertisement
const deleteAdvertisement = async(req,res) => {
    const { id } = req.params

     //check if the id added is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such id'})
    }

    const advertisement = await Advertisement.findOneAndDelete({_id: id})

    //check if there is such advertisement
    if(!advertisement){
        return res.status(404).json({error: 'No such advertisement founded'}) 
    }
    res.status(200).json(advertisement)

}

//Update a advertisement
const updateAdvertisement = async (req,res) =>{
    const { id } = req.params

     //check if the id added is valid
     if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such id'})
    }

    const advertisement = await Advertisement.findOneAndUpdate({_id: id},{
        ...req.body
    })

    //check if there is such advertisement
    if(!advertisement){
        return res.status(404).json({error: 'No such advertisement founded'}) 
    }
    res.status(200).json(advertisement)


}//contain controller functions
const Advertisement = require('../models/advertisementModel')
const mongoose = require('mongoose')

// get all Advertisements
    const getAdvertisements = async (req, res) => {
            const user_id = req.user._id

            const advertisements = await Advertisement.find({user_id}).sort({createdAt: -1})
   
            res.status(200).json(advertisements)
    }     

// get a single Advertisement
    const getAdvertisement = async (req, res) => {
            const { id } = req.params
                //check if the id added is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({error: 'Invalid advertisement ID'})
            }

            const advertisement = await Advertisement.findById(id)

            //check if there is such Advertisement
            if (!advertisement) {
                return res.status(404).json({error: 'Advertisement not found'})
            }

            res.status(200).json(advertisement)

    }

// create a new Advertisement
    const createAdvertisement = async (req, res) => {
            const {adTitle, description, startDate,endDate,offerType} = req.body

            let emptyFields = []
            //detect which feilds are empty
            if(!adTitle) {
                emptyFields.push('adTitle')
            }
            if(!description) {
                emptyFields.push('description')
            }
            if(!startDate) {
                emptyFields.push('startDate')
            }
            if(!endDate) {
                emptyFields.push('endDate')
            }
            if(!offerType) {
                emptyFields.push('offerType')
            }
            if(emptyFields.length > 0) {
                return res.status(400).json({ error: 'Plese fill in all the fields', emptyFields })
            }

            // add  doc to the database
            try {
                const user_id = req.user._id
                const advertisement = await Advertisement.create({adTitle, description, startDate,endDate,offerType, user_id })
                res.status(200).json(advertisement)
            } catch (error) {
                res.status(400).json({ error: error.message })
            } 
    }

// delete a Advertisement
    const deleteAdvertisement = async (req, res) => {
        const { id } = req.params
        //check if the id added is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid advertisement ID'})
        }
                                                    //property name = _id
        const advertisement = await Advertisement.findOneAndDelete({_id: id})
    
        //check if there is such Advertisement
        if(!advertisement) {
            return res.status(400).json({error: 'Advertisement not found'})
        }

        res.status(200).json(advertisement)
    }

// update a Advertisement
    const updateAdvertisement = async (req, res) => {
        const { id } = req.params

        //check if the id added is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: 'Invalid advertisement ID'})
        }

        const advertisement = await Advertisement.findOneAndUpdate({_id: id}, {
        ...req.body
        })

        //check if there is such Advertisement
        if (!advertisement) {
            return res.status(400).json({error: 'Advertisement not found'})
        }

        res.status(200).json(advertisement)
    }

module.exports = {
    getAdvertisements,
    getAdvertisement,
    createAdvertisement,
    deleteAdvertisement,
    updateAdvertisement
}


module.exports ={
    getAdvertisements,
    getAdvertisement,
    createAdvertisement,
    deleteAdvertisement,
    updateAdvertisement
}