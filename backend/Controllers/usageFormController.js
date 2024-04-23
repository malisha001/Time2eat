const usageInventory = require('../model/usageFormModel')
const mongoose = require('mongoose')

// create new usage item
const createUsageItem = async (req, res) => {

    const {  newQuantity, usageItemName, remainingQuant, Iquantity, Uprice } = req.body;

    try{
 
        const usageitem = await usageInventory.create({ usageItemName, newQuantity,remainingQuant, Iquantity, Uprice });
        res.status(200).json(usageitem)

    }catch(error){
        res.status(400).json({error: error.messgae});
    }
};

// get all usage items
const getUsageItems = async (req, res) => {
    const usageitem = await usageInventory.find({}).sort({createAt: -1})
    res.status(200).json(usageitem)
} 

// update a single usage item
const updateUsageItem = async(req, res) => {
    const {id} = req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such an Usage Item'})
    }

    const usageitem = await usageInventory.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!usageitem){
        return res.status(400).json({error: 'No such usage item'})
    }
    res.status(200).json(usageitem)
}

// delete an usage item
const deleteUsageItem = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such usage item' });
    }

    const usageItem = await usageInventory.findByIdAndDelete({_id: id})

    if(!usageItem){
        return res.status(400).json({error: 'No such an usage item'})
    }
    res.status(200).json(usageItem)
    
}


// get a single inventory item
const getAusageItem = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Inventory item' });
    }

    try {
        const usageItem = await usageInventory.findById(id);

        if (!usageItem) {
            return res.status(404).json({ error: 'No such Inventory item' });
        }

        return res.status(200).json(usageItem);
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
};





module.exports = {
    createUsageItem,
    getUsageItems,
    updateUsageItem,
    deleteUsageItem,
    getAusageItem
}
