import React, { useEffect, useState } from "react";
import UsageItemDetails from '../components/usageItemDetails';

const Usage = () => {
    const [Uitems, setUItems] = useState(null);
    const [usageItemName, setUsageItemName] = useState('');
    const [initialQuantity, setInitialQuantity] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllItems = async () => {
            const response = await fetch('/api/inventory');
            const json = await response.json();

            if(response.ok) {
                setUItems(json);
            }
        };
        fetchAllItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const usageItem = { usageItemName, initialQuantity, newQuantity };
        const response = await fetch('/api/usage/', {
            method: 'POST',
            body: JSON.stringify(usageItem),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if(!response.ok) {
            setError(json.error);
        }
        if(response.ok) {
            setUsageItemName('');
            setInitialQuantity('');
            setNewQuantity('');
            setError(null);
        }
    };

    return (
        <div className="usage-home">
            <h1>Usage</h1>
            <hr />
            <form className="uForm" onSubmit={handleSubmit}>
                <ul>
                    <li>Item Name</li>
                    <li>Initial Quantity</li>
                    <li>New Quantity</li>
                </ul>
                <div className="U-items">
                    {Uitems && Uitems.map((item) => (
                        <UsageItemDetails
                            key={item._id}
                            item={item}
                            setUsageItemName={setUsageItemName}
                            setNewQuantity={setNewQuantity}
                            setInitialQuantity={setInitialQuantity}
                        />     
                    ))}
                </div>
                <button type="submit">Submit</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Usage;
