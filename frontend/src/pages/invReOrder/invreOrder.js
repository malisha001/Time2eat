import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './invreOr.css';

import Navbar from "../../component/inventoryNavbar/invNavBar";

const ReOrder = () => {

  

    const [rItems, setRItems] = useState(null);
    const [totalPrices, setTotalPrices] = useState({});
    const [reOrderItemName, setReOrderItemName] = useState("");
    const [reOrderQuantity, setReOrderQuantity] = useState(0);
    const [reOrderAmount, setReOrderAmount] = useState(0);

    useEffect(() => {
        const fetchReorderItems = async () => {
            try {
                const response = await fetch('/api/usage');
                if (!response.ok) {
                    throw new Error('Failed to fetch reorder items');
                }
                const json = await response.json();
                console.log("reorder", json);
                setRItems(json);
            } catch (error) {
                console.error('Error fetching reorder items:', error);
            }
        }
        fetchReorderItems();
    }, [])

    const handleQuantityChange = (itemId, quantity, Uprice) => {
        const totalPrice = quantity * Uprice;
        setTotalPrices(prevState => ({
            ...prevState,
            [itemId]: totalPrice
        }));
        setReOrderQuantity(quantity);
    };

    const navigate = useNavigate() 

    const handleReOrder = async (itemname,itemprice,itemDetails) => {
        try {

            console.log("test reorder");
            const reOrderItem = { 
                reOrderItemName: itemname, 
                reOrderQuantity: reOrderQuantity, 
                reOrderAmount: itemprice
            };

            const usageItem = {

                
                remainingQuant: reOrderQuantity
                
                
            }
            const upresponse = await fetch(`/api/usage/${itemDetails._id}`, {
                method: 'PATCH',
                body: JSON.stringify(usageItem),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            

            const response = await fetch('/api/reorder/', {
                method: 'POST',
                body: JSON.stringify(reOrderItem),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const json = await response.json();
    
            if (!response.ok) {
                console.log("error button");
            } else {
                // Clear input fields and errors on successful submission
                setReOrderItemName("");
                setReOrderQuantity(0);
                setReOrderAmount(0);
                console.log('New item added:', json);
                navigate("/inventory/items/");
            }
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    }
    
    



    return (
        <div>
            <Navbar/>
            <div className="inv-ReorderHome">
                <h1>Welcome to restaurant’s Re-order details</h1>
                <hr />
                <h4>Given below are the food items that need to be Re-Order,</h4>

                <div className="inv-ReOrdItems">
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Re-Order Point</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rItems && rItems.map((item) => {
                                const totalPrice = totalPrices[item._id] || 0;

                                // Assuming Iquantity and Uprice are properties of each item in rItems
                                if (item.remainingQuant <= item.reOrderQuan) {
                                    return (
                                        <tr key={item._id}>
                                            <td>{item.usageItemName}</td>
                                            <td><input
                                                    type="number"
                                                    onChange={(e) => handleQuantityChange(item._id, e.target.value, item.Uprice)}
                                                /></td>
                                            <td>{totalPrice}</td>
                                            <td>
                                                
                                                <button onClick={() => handleReOrder(item.usageItemName,totalPrice,item)} className="inv-ReorderUpdateBtn">Re-Order</button>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return null;
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <br /><br /><br />
            </div>
        </div>
    );
}

export default ReOrder;
