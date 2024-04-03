import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFoodItems = () => {
    const { id } = useParams(); // Get the food item id from URL params
    const navigate = useNavigate();

    const [values, setValues] = useState({
        Item_id: '',
        Item_name: '',
        catagory: '',
        Price: '',
        Average_preparetime: ''
    });

    useEffect(() => {
        // Fetch food item details based on id
        const fetchFoodItem = async () => {
            try {
                const response = await fetch(`/api/fooditems/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setValues(data);
                } else {
                    console.error("Failed to fetch food item");
                }
            } catch (error) {
                console.error("Error fetching food item:", error);
            }
        };
        fetchFoodItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await fetch(`/api/fooditems/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                navigate('/fooditems'); // Redirect to menu after successful update
            } else {
                console.error("Failed to update food item");
            }
        } catch (error) {
            console.error("Error updating food item:", error);
        }
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Update Food Item Details</h3>
                <div>
                    <label>Item ID:</label>
                    <input 
                        type="text"
                        value={values.Item_id}
                        onChange={e => setValues({...values, Item_id: e.target.value})}
                    />
                </div>
                <div>
                    <label>Item Name:</label>
                    <input 
                        type="text"
                        value={values.Item_name}
                        onChange={e => setValues({...values, Item_name: e.target.value})}
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input 
                        type="text"
                        value={values.catagory}
                        onChange={e => setValues({...values, catagory: e.target.value})}
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input 
                        type="text"
                        value={values.Price}
                        onChange={e => setValues({...values, Price: e.target.value})}
                    />
                </div>
                <div>
                    <label>Average Prepare Time:</label>
                    <input 
                        type="text"
                        value={values.Average_preparetime}
                        onChange={e => setValues({...values, Average_preparetime: e.target.value})}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateFoodItems;
