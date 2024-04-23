const ReorderInventory = require('../model/reOrderModel')
const mongoose = require('mongoose')

// get all re-order items
const getReorderItems = async (req, res) => {
    const reorderItems = await ReorderInventory.find({}).sort({createdAt: -1})
    res.status(200).json(reorderItems)
}

// get a single re-order item
const getReorderItem = async (req,res) => {
    const {id} = req.params;

    // check that id is valid MongoDb Object ID
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status (404).json({error: 'No such Re-Oreder item'});
    }

    try{
        const reorderItems = await ReorderInventory.findById(id);
        if(!reorderItems){
            return res.status(404).json({ error: 'No such Re-Oreder item' });
        }

        return res.status(200).json(reorderItems);

    }catch(error){
        return res.status(500).json({ error: 'Server Error' });
    }
}



// create a new Re-order item
const createReorderItem =  async (req, res) => {
    const { reOrderItemName, reOrderQuantity, reOrderAmount } = req.body;

    //add doc to db
    try {
        const reorderItems = await ReorderInventory.create({ reOrderItemName, reOrderQuantity, reOrderAmount});
        res.status(200).json(reorderItems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete an inventory item
const deleteReorderItem = async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such Re-order item' });
    }

    const reorderItems = await ReorderInventory.findByIdAndDelete({_id: id})

    if(!reorderItems){
        return res.status(400).json({error: 'No such Re-order item'})
    }
    res.status(200).json(reorderItems)
    
}

// update an inventory item
const updateReorderItem = async(req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Re-order item'})
    }

    const reorderItems = await ReorderInventory.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!reorderItems){
        return res.status(400).json({error: 'No such Re-order item'})
    }
    res.status(200).json(reorderItems)
}

module.exports = {
    getReorderItems,
    getReorderItem,
    createReorderItem,
    deleteReorderItem,
    updateReorderItem
}