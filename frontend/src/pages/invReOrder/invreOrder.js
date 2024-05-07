import { useState, useEffect } from "react";
import './invreOr.css';
import axios from "axios";
import Navbar from "../../component/inventoryNavbar/invNavBar";

const ReOrder = () => {

    const { id } = useParams();
    const [rItems, setRItems] = useState(null);
    const [totalPrices, setTotalPrices] = useState({});

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
    };

   const handleReOrder = () => {

   }

   const handleDelete = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.patch(`/api/inventory/${id}`, {
            
        });
        console.log(response.data);
        navigate('/inventory/items');
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
                                                
                                                <button onClick={() => handleDelete(item._id)} className="inv-ReorderDeleteBtn">Delete</button>
                                                <button onClick={() => handleReOrder(item._id)} className="inv-ReorderUpdateBtn">Re-Order</button>
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


