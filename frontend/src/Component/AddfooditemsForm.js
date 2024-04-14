import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddfooditemsForm = () => {
    const navigate = useNavigate();
    const [Item_id, setItem_id] = useState('');
    const [Item_name, setItem_name] = useState('');
    const [catagory, setCatagory] = useState('');
    const [Price, setPrice] = useState('');
    const [Average_preparetime, setAverage_preparetime] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                navigate('/allfooditems');
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
                onChange={(e) => setItem_id(e.target.value)}
                value={Item_id}
            />

            <label>Item Name:</label>
            <input
                type="text"
                onChange={(e) => setItem_name(e.target.value)}
                value={Item_name}
            />

            <label>Category:</label>
            <input
                type="text"
                onChange={(e) => setCatagory(e.target.value)}
                value={catagory}
            />

            <label>Price:</label>
            <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={Price}
            />

            <label>Average Prepare Time:</label>
            <input
                type="text"
                onChange={(e) => setAverage_preparetime(e.target.value)}
                value={Average_preparetime}
            />

            <button type="submit">Add Food Item</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default AddfooditemsForm;
