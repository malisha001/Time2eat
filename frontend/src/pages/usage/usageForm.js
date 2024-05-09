import React, { useEffect, useState } from "react";
import Navbar from "../../component/inventoryNavbar/invNavBar";
import './use.css'

const Usage = ({ data }) => {
    const [Uitems, setUItems] = useState(null);
    const [usageItemName, setUsageItemName] = useState('');
    const [newQuantities, setNewQuantities] = useState({});
    const [itemInitialQuantities, setItemInitialQuantities] = useState({});
    const [previousRemainingQuants, setPreviousRemainingQuants] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAllItems = async () => {
            try {
                const response = await fetch('/api/inventory');
                const json = await response.json();

                if (response.ok) {
                    setUItems(json);

                    // Extract item IDs
                    const itemIds = json.map(item => item._id);

                    // Fetch item initial quantities for each item
                    const initialQuantities = await Promise.all(
                        itemIds.map(async itemId => {
                            const response = await fetch(`/api/inventory/${itemId}`);
                            const data = await response.json();
                            return { [itemId]: data.itemInitialQuantity };
                        })
                    );

                    // Merge initial quantities into a single object
                    const mergedQuantities = Object.assign({}, ...initialQuantities);
                    setItemInitialQuantities(mergedQuantities);
                } else {
                    setError('Failed to fetch inventory items.');
                }
            } catch (error) {
                setError('An error occurred while fetching inventory items.');
            }
        };
        fetchAllItems();
    }, []);

    const handleItemSelect = (itemName) => {
        setUsageItemName(itemName);
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
        if (Object.keys(newQuantities).length === 0) {
            setError("Please enter new quantities for at least one item.");
            return;
        }

        // Iterate over the selected items and send them to the database separately
        for (const itemId in newQuantities) {
            const newQuantity = newQuantities[itemId];

            // Get the item name based on the item ID
            const selectedItem = Uitems.find(item => item._id === itemId);
            const itemName = selectedItem.itemName;
            const itemInitialQuantity = selectedItem.itemInitialQuantity;
            const itemPrice = selectedItem.itemPrice;
            const reOrderitem = selectedItem.reOrderitem;

            const initialQuantity = itemInitialQuantities[itemId];
            const previousRemainingQuant = previousRemainingQuants[itemId] || initialQuantity; // Get previous remainingQuant or use initialQuantity
            const remainingQuant = previousRemainingQuant - newQuantity;

            // Update the previousRemainingQuants state with the new remainingQuant
            setPreviousRemainingQuants(prevState => ({
                ...prevState,
                [itemId]: remainingQuant
            }));

            const usageItem = {
                usageItemName: itemName,
                newQuantity,
                remainingQuant,
                reOrderQuan: reOrderitem,
                Iquantity: itemInitialQuantity,
                Uprice: itemPrice
            };
            const response = await fetch('/api/usage/', {
                method: 'POST',
                body: JSON.stringify(usageItem),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setError(json.error);
                return; // Exit the function if an error occurs
            }
        }

        // Clear the state after successful submission
        setNewQuantities({});
        setError(null);
    };

    return (
        <div>
            <Navbar />
            <div className="usage-home">
                <h1>Enter Usage details here</h1>
                <hr />
                <form className="uForm" onSubmit={handleSubmit}>
                    <div className="U-items">
                        <table className="usageItemTable">
                            <thead className="usageHead">
                                <tr>
                                    <th>Item Name</th>
                                    <th>New Quantity</th>
                                </tr>
                            </thead>
                            <tbody className="usageBody">
                                {Uitems && Uitems.map((item) => (
                                    <tr key={item._id}>
                                        <td onClick={() => handleItemSelect(item.itemName)}>{item.itemName}</td>
                                        <td><input type="Number" onChange={(e) => handleNewQuantityChange(item._id, e.target.value)} value={newQuantities[item._id] || ''} min={0} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button className="usageButton" type="submit" >Submit</button>
                    {error && <div className="UsageError">{error}</div>}
                </form>

            </div>
        </div>
    );
};

export default Usage;
