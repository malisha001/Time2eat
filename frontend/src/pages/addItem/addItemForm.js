import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './addItem.css';
import Navbar from "../../component/inventoryNavbar/invNavBar";

const ItemForm = () => {
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemInitialQuantity, setItemInitialQuantity] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [reOrderitem, setReOrderitem] = useState('');
    const [itemNameError, setItemNameError] = useState(null); 
    const [itemCategoryError, setItemCategoryError] = useState(null); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleItemNameChange = (value) => {
        if (!value.match(/\d/)) { // Check if the value contains letters
            setItemName(value);
            setItemNameError('');
        } else {
            setItemNameError('Item Name should only contain letters and spaces');
        }
    };
    
    const handleItemCategoryChange = (value) => {
        if (!value.match(/\d/)) { // Check if the value contains letters
            setItemCategory(value);
            setItemCategoryError('');
        } else {
            setItemCategoryError('Item Category should only contain letters and spaces');
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if there are errors in item name or item category
        if (itemNameError || itemCategoryError) {
            return; // Exit the function if there are errors
        }

        const inventoryItem = { itemId, itemName, reOrderitem, itemInitialQuantity, itemPrice, itemCategory };
        const response = await fetch('/api/inventory/', {
            method: 'POST',
            body: JSON.stringify(inventoryItem),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            // Set errors based on the server response
            setItemNameError(json.error);
            setItemCategoryError(json.error);
        } else {
            // Clear input fields and errors on successful submission
            setItemId('');
            setItemName('');
            setItemInitialQuantity('');
            setItemPrice('');
            setItemCategory('');
            setItemNameError('');
            setReOrderitem('');
            setItemCategoryError('');
            setError(null);
            console.log('new item added', json);
            navigate("/inventory/items/");
        }
    };

    return (

        <div>
            <Navbar/>
            <div className="inventoryAddFood">
                <h1>Welcome to TIME<strong>2eat</strong> Inventory</h1>
                <hr />
                <h4>Please add new items here,</h4>

                <form className="createee" onSubmit={handleSubmit}>
                    <div className="input-image">
                        <div className="firstIn">
                            <label>Item ID :</label>
                            <input type="Number" onChange={(e) => setItemId(e.target.value)} value={itemId} />

                            <label>Item Name :</label>
                            <input type="text" onChange={(e) => handleItemNameChange(e.target.value)} value={itemName} />
                            {itemNameError && <div className="inventoryAddItemError">{itemNameError}</div>} 

                            <label>Item Re-order Level :</label>
                            <input type="Number" onChange={(e) => setReOrderitem(e.target.value)} value={reOrderitem} />

                            <label>Initial Quantity :</label>
                            <input type="Number" onChange={(e) => setItemInitialQuantity(e.target.value)} value={itemInitialQuantity} />
                        </div>
                        <img src="/Popular-foods.jpg" alt="" />
                    </div>

                    <div className="lastInput">
                        <div className="addItem-InContainer">
                            <label>Item Price (Rs.) : </label>
                            <input type="Number" onChange={(e) => setItemPrice(e.target.value)} value={itemPrice} />
                        </div>
                        <div className="addItem-InContainer">
                            <label>Item Category : </label>
                            <input type="text" onChange={(e) => handleItemCategoryChange(e.target.value)} value={itemCategory} />
                            {itemCategoryError && <div className="inventoryAddItemError">{itemCategoryError}</div>}
                        </div>
                    </div>

                    <br />
                    <button className="inventoryAddButton">Save Item</button>
                    {error && <div className="addError">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default ItemForm;



