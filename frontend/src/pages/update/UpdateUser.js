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
                setQuantity(data.itemQuantity);
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
        try {
            const response = await axios.patch(`/api/inventory/${id}`, {
                itemName: name,
                itemQuantity: quantity,
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
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Item Quantity :</label>
                <input
                    type="Number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <label>Item Price :</label>
                <input
                    type="Number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label>Item Category :</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <br />
                <button>Update Item</button>
            </form>
        </div>
    );
}

export default UpdateUser;
