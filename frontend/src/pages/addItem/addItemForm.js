import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './addItem.css';

const ItemForm = () => {
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemCategory, setItemCategory] = useState('');
    const [itemNameError, setItemNameError] = useState(null); 
    const [itemCategoryError, setItemCategoryError] = useState(null); 
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleItemNameChange = (value) => {
        if (value.match(/\d/)) {
            setItemNameError('Item Name should only contain letters and spaces');
        } else {
            setItemNameError('');
        }
        setItemName(value);
    };

    const handleItemCategoryChange = (value) => {
        if (value.match(/\d/)) {
            setItemCategoryError('Item Category should only contain letters and spaces');
        } else {
            setItemCategoryError('');
        }
        setItemCategory(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const inventoryItem = { itemId, itemName, itemQuantity, itemPrice, itemCategory };
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
            setItemQuantity('');
            setItemPrice('');
            setItemCategory('');
            setItemNameError('');
            setItemCategoryError('');
            setError(null);
            console.log('new item added', json);
            navigate("/inventory/items/");
        }
    };

    return (
        <div className="inventoryAddFood">
            <h1>Welcome to TIME<strong>2eat</strong> Inventory</h1>
            <hr />
            <h4>Please add new items here,</h4>

            <form className="create" onSubmit={handleSubmit}>
                <div className="input-image">
                    <div className="firstIn">
                        <label>Item ID :</label>
                        <input type="Number" onChange={(e) => setItemId(e.target.value)} value={itemId} />

                        <label>Item Name :</label>
                        <input type="text" onChange={(e) => handleItemNameChange(e.target.value)} value={itemName} />
                        {itemNameError && <div className="inventoryAddItemError">{itemNameError}</div>} 

                        <label>Item Quantity :</label>
                        <input type="Number" onChange={(e) => setItemQuantity(e.target.value)} value={itemQuantity} />
                    </div>
                    <img src="/Popular-foods.jpg" alt="" />
                </div>

                <div className="inputTwo">
                    <div className="input-container">
                        <label>Item Price:</label>
                        <input type="Number" onChange={(e) => setItemPrice(e.target.value)} value={itemPrice} />
                    </div>

                    <div className="input-container">
                        <label>Item Category:</label>
                        <input type="text" onChange={(e) => handleItemCategoryChange(e.target.value)} value={itemCategory} />
                        {itemCategoryError && <div className="inventoryAddItemError">{itemCategoryError}</div>} {/* Display Item Category error */}
                    </div>
                </div>

                <br />
                <button className="inventoryAddButton">Save Item</button>
                {error && <div className="addError">{error}</div>}
            </form>
        </div>
    );
};

export default ItemForm;
