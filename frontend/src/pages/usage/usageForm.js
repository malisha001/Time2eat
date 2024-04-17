import React, { useEffect, useState } from "react";
import './use.css'

const Usage = () => {
    const [Uitems, setUItems] = useState(null);
    const [usageItemName, setUsageItemName] = useState('');
    const [initialQuantities, setInitialQuantities] = useState({});
    const [newQuantities, setNewQuantities] = useState({});
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

    const handleItemSelect = (itemName) => {
        setUsageItemName(itemName);
    };

    const handleInitialQuantityChange = (itemId, value) => {
        setInitialQuantities(prevState => ({
            ...prevState,
            [itemId]: value
        }));
    };

    const handleNewQuantityChange = (itemId, value) => {
        setNewQuantities(prevState => ({
            ...prevState,
            [itemId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if there are any items selected
        if (Object.keys(initialQuantities).length === 0) {
            setError("Please select at least one item.");
            return;
        }
    
        // Iterate over the selected items and send them to the database separately
        for (const itemId in initialQuantities) {
            const initialQuantity = initialQuantities[itemId];
            const newQuantity = newQuantities[itemId];
            
            // Get the item name based on the item ID
            const selectedItem = Uitems.find(item => item._id === itemId);
            const itemName = selectedItem.itemName;
            
            const usageItem = { usageItemName: itemName, initialQuantity, newQuantity };
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
                return; // Exit the function if an error occurs
            }
        }
    
        // Clear the state after successful submission
        setInitialQuantities({});
        setNewQuantities({});
        setError(null);
    };
    

    return (
        <div className="usage-home">
            <h1>Enter Usage details here</h1>
            <hr />
            <form className="uForm" onSubmit={handleSubmit}>    
                <div className="U-items">
                            <table className="usageItemTable">
                                <thead className="usageHead">
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Initial Quantity</th>
                                        <th>New Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="usageBody">
                                    {Uitems && Uitems.map((item)=> (
                                        <tr key={item._id}>
                                            <td onClick={() => handleItemSelect(item.itemName)}>{item.itemName}</td>
                                            <td><input type="Number" onChange={(e) => handleInitialQuantityChange(item._id, e.target.value)} value={initialQuantities[item._id] || ''}/></td>
                                            <td><input type="Number" onChange={(e) => handleNewQuantityChange(item._id, e.target.value)} value={newQuantities[item._id] || ''} /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                </div> 

                <button className="usageButton" type="submit" >Submit</button>
                {error && <div className="UsageError">{error}</div>}           
            </form>
        </div>
    );
};

export default Usage;
