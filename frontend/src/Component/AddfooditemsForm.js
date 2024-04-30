import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddfooditemsForm = () => {
    const navigate = useNavigate();
    const [Item_id, setItem_id] = useState('');
    const [Item_name, setItem_name] = useState('');
    const [catagory, setCatagory] = useState('');
    const [Price, setPrice] = useState('');
    const [Average_preparetime, setAverage_preparetime] = useState('');
    const [error, setError] = useState(null);
    const [priceError, setPriceError] = useState('');
    const [timeError, setTimeError] = useState('');
    const [nameError, setNameError] = useState('');
    const [categoryError, setCategoryError] = useState('');
    const [idError, setIdError] = useState('');

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

    const validateID = (value) => {
        if (!value) {
            setIdError('Item ID is required');
            return false;
        }
        setIdError('');
        return true;
    };

    const handleNameChange = (value) => {
        setItem_name(value);
        if (!value) {
            setNameError('Item Name is required');
        } else {
            setNameError('');
        }
    };

    const handleCategoryChange = (value) => {
        setCatagory(value);
        if (!value) {
            setCategoryError('Category is required');
        } else {
            setCategoryError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check for required fields
        if (!Item_name || !catagory || !Price || !Average_preparetime || !Item_id) {
            setError('Please fill in all required fields.');
            return;
        }

        // Check for valid Price, Average_preparetime, and Item ID
        if (!validatePrice(Price) || !validateTime(Average_preparetime) || !validateID(Item_id)) {
            setError('Please ensure all fields are filled correctly.');
            return;
        }

        const fooditem = { Item_id, Item_name, catagory, Price, Average_preparetime };

        try {
            const response = await fetch('/api/fooditems', {
                method: 'POST',
                body: JSON.stringify(fooditem),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
            } else {
                setItem_id('');
                setItem_name('');
                setCatagory('');
                setPrice('');
                setAverage_preparetime('');
                setError(null);
                console.log('New food item added', json);

                // Navigate to the desired page
                navigate('/fooditems');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add Food Items</h2>

            <label>Item ID:</label>
            <input
                type="text"
                onChange={(e) => {
                    setItem_id(e.target.value);
                    validateID(e.target.value);
                }}
                value={Item_id}
            />
            {idError && <div className="error">{idError}</div>}

            <label>Item Name:</label>
            <input
                type="text"
                onChange={(e) => handleNameChange(e.target.value)}
                value={Item_name}
            />
            {nameError && <div className="error">{nameError}</div>}

            <label>Category:</label>
            <input
                type="text"
                onChange={(e) => handleCategoryChange(e.target.value)}
                value={catagory}
            />
            {categoryError && <div className="error">{categoryError}</div>}

            <label>Price:(LKR)</label>
            <input
                type="text"
                onChange={(e) => {
                    setPrice(e.target.value);
                    validatePrice(e.target.value);
                }}
                value={Price}
            />
            {priceError && <div className="error">{priceError}</div>}

            <label>Average Prepare Time:(min)</label>
            <input
                type="text"
                onChange={(e) => {
                    setAverage_preparetime(e.target.value);
                    validateTime(e.target.value);
                }}
                value={Average_preparetime}
            />
            {timeError && <div className="error">{timeError}</div>}

            <button type="submit" className="addfoodbutton">Add Food Item</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default AddfooditemsForm;
