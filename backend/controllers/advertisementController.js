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


}
module.exports ={
    getAdvertisements,
    getAdvertisement,
    createAdvertisement,
    deleteAdvertisement,
    updateAdvertisement
}