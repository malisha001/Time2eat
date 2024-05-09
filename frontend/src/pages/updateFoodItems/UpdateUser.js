import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './upDate.css';

function UpdateUser() {
    const { id } = useParams();

    const [itemid, setItemId] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [reorder, setReOrder] = useState("");
    const [itemNameError, setItemNameError] = useState(null); 
    const [itemCategoryError, setItemCategoryError] = useState(null); 


    const handleItemNameChange = (value) => {
        if (!/^[A-Za-z\s]*$/.test(value)) { // Check if the value contains only letters and spaces
            setItemNameError('Item Name should only contain letters and spaces');
        } else {
            setName(value);
            setItemNameError('');
        }
    };

    const handleItemCategoryChange = (value) => {
        if (!/^[A-Za-z\s]*$/.test(value)) { // Check if the value contains only letters and spaces
            setItemCategoryError('Item Category should only contain letters and spaces');
        } else {
            setCategory(value);
            setItemCategoryError('');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/inventory/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data);

                // Assuming data structure is like { itemid, name, quantity, price, category }
                setItemId(data.itemId);
                setName(data.itemName);
                setQuantity(data.itemInitialQuantity);
                setReOrder(data.reOrderitem);
                setPrice(data.itemPrice);
                setCategory(data.itemCategory);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id])

    const navigate = useNavigate() 

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Check if there are errors in item name or item category
        if (itemNameError || itemCategoryError) {
            return; // Exit the function if there are errors
        }

        try {
            const response = await axios.patch(`/api/inventory/${id}`, {
                itemId:itemid,
                itemName: name,
                itemInitialQuantity: quantity,
                reOrderitem:reorder,
                itemPrice: price,
                itemCategory: category
            });
            console.log(response.data);
            navigate('/inventory/items');
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    }

    return (
        <div className="formUpdate">
            <h1>Update your Item details here,</h1>
            <hr />
            <form className="Formcreate" onSubmit={handleUpdate}>
              

                <label>Item ID :</label>
                <input
                    type="Number"
                    value={itemid}
                    onChange={(e) => setItemId(e.target.value)}
                />

                <label>Item Name :</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => handleItemNameChange(e.target.value)}
                />
     
                {itemNameError && <div className="upInventoryAddItemError">{itemNameError}</div>} 
             

                <label>Item Quantity :</label>
                <input
                    type="Number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <label>Re-order Level :</label>
                <input
                    type="Number"
                    value={reorder}
                    onChange={(e) => setReOrder(e.target.value)}
                />

                <label>Item Price (Rs.) :</label>
                <input
                    type="Number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label>Item Category :</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => handleItemCategoryChange(e.target.value)}
                />
    
                {itemCategoryError && <div className="upInventoryAddItemError">{itemCategoryError}</div>}
                

                <br />
                <button className="updateButton">Update Item</button>
            </form>
        </div>
    );
}

export default UpdateUser;