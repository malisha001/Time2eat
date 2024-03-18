const Inventory = require('../model/inventoryModel') 
const mongoose = require('mongoose')

// get all inventory items
const getInventoryItems = async(req, res) => {
    const inventoryItems = await Inventory.find({}).sort({createdAt: -1})

    res.status(200).json(inventoryItems)
}


// get a single inventory item
const getInventoryItem = async (req, res) => {
    const { id } = req.params;

    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Inventory item' });
    }

    try {
        const inventoryItem = await Inventory.findById(id);

        if (!inventoryItem) {
            return res.status(404).json({ error: 'No such Inventory item' });
        }

        return res.status(200).json(inventoryItem);
    } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }
};




// create a new inventory item
const createInvenotyItem =  async (req, res) => {
    const { itemId, itemName, itemQuantity, itemPrice, itemCategory, itemImage } = req.body;

    //add doc to db
    try {
        const inventory = await Inventory.create({ itemId, itemName, itemQuantity, itemPrice, itemCategory, itemImage });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// delete an inventory item
const deleteInventoryItem = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such Inventory item' });
    }

    const inventoryItem = await Inventory.findByIdAndDelete({_id: id})

    if(!inventoryItem){
        return res.status(400).json({error: 'No such an inventory item'})
    }
    res.status(200).json(inventoryItem)
    
}

// update an inventory item
const updateInventoryItem = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such an Inventory item'})
    }

    const inventoryItem = await Inventory.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!inventoryItem){
        return res.status(400).json({error: 'No such an Inventory Item'})
    }
    res.status(200).json(inventoryItem)
}


module.exports = {
    createInvenotyItem,
    getInventoryItems,
    getInventoryItem,
    deleteInventoryItem,
    updateInventoryItem
}