import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './updatefooditems.css'

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

    
    const [nameError, setNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [timeError, setTimeError] = useState('');

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

    const validatePrice = (value) => {
        if (!value || isNaN(value)) {
            setPriceError('Price must be a number');
            return false;
        }
        setPriceError('');
        return true;
    };

    const validateTime = (value) => {
        if (!value || isNaN(value)) {
            setTimeError('Average Prepare Time must be a number');
            return false;
        }
        setTimeError('');
        return true;
    };

    const handleNameChange = (value) => {
        setValues({...values, Item_name: value});
        if (!value) {
            setNameError('Item Name is required');
        } else {
            setNameError('');
        }
    };

    const handleCategoryChange = (value) => {
        setValues({...values, catagory: value});
        if (!value) {
            setCategoryError('Category is required');
        } else {
            setCategoryError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for required fields
        let hasError = false;
        if (!values.Item_name) {
            setNameError('Item Name is required');
            hasError = true;
        }
        if (!values.catagory) {
            setCategoryError('Category is required');
            hasError = true;
        }
        if (!values.Price) {
            setPriceError('Price is required');
            hasError = true;
        } else if (isNaN(values.Price)) {
            setPriceError('Price must be a number');
            hasError = true;
        }
        if (!values.Average_preparetime) {
            setTimeError('Average Prepare Time is required');
            hasError = true;
        } else if (isNaN(values.Average_preparetime)) {
            setTimeError('Average Prepare Time must be a number');
            hasError = true;
        }

        if (hasError) {
            return;
        }

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
    };

    return (
        <div className="up-food-menu">
            <form onSubmit={handleSubmit}>
                <h3>Update Food Item Details</h3>
                <div>
                    <label>Item ID:</label>
                    <input 
                        type="text"
                        value={values.Item_id}
                        disabled // Disable editing of Item ID
                    />
                </div>
                <div>
                    <label>Item Name:</label>
                    <input 
                        type="text"
                        value={values.Item_name}
                        onChange={(e) => handleNameChange(e.target.value)}
                    />
                    {nameError && <div className="error">{nameError}</div>}
                </div>
                <div>
                    <label>Category:</label>
                    <input 
                        type="text"
                        value={values.catagory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                    />
                    {categoryError && <div className="error">{categoryError}</div>}
                </div>
                <div>
                    <label>Price:(LKR)</label>
                    <input 
                        type="text"
                        value={values.Price}
                        onChange={(e) => {
                            setValues({...values, Price: e.target.value});
                            validatePrice(e.target.value);
                        }}
                    />
                    {priceError && <div className="error">{priceError}</div>}
                </div>
                <div>
                    <label>Average Prepare Time:(min)</label>
                    <input 
                        type="text"
                        value={values.Average_preparetime}
                        onChange={(e) => {
                            setValues({...values, Average_preparetime: e.target.value});
                            validateTime(e.target.value);
                        }}
                    />
                    {timeError && <div className="error">{timeError}</div>}
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateFoodItems;
