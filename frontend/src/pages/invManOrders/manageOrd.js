import './manOrd.css'
import { Link } from 'react-router-dom'
import Navbar from '../../component/inventoryNavbar/invNavBar'
import { useEffect, useState } from 'react'

const ManageOrder = () => {


    const [orders, setOrders] = useState(null);



    useEffect(() => {
        const fetchOnlineOrders = async () => {
            try {
                const response = await fetch('/api/onlineOrders/rider');
                if (!response.ok) {
                    throw new Error('Failed to fetch online orders');
                }
                const json = await response.json();
                console.log("onlineorders", json);
                setOrders(json);
            } catch (error) {
                console.error('Error fetching online orders:', error);
            }
        };
        fetchOnlineOrders();
    }, []);

    const handleDelete = async (orderId) => {
        const response = await fetch('/api/onlineOrders/' + orderId, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Remove the deleted item from the items state
            setOrders(orders.filter(order => order._id !== orderId));
            // Update total category count after deletion
           /*updateTotalCategoryCount(items.filter(item => item._id !== itemId));*/
        }
    };
    


    return(
        <div>
            <Navbar/>
                <div className="inv-manageOrder">
                    <h1>Welcome to restaurant’s online order management</h1>
                    <hr />
                    <h2>Orders</h2>
                    <h4>Given below are the food items that need to be Re-Order,</h4>

                   
                    <div className="OnlineOrder-Items">
                    
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer Name</th>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price (Rs.)</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {orders && orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.orderid}</td>
                                    <td>{order.cusName}</td>
                                    <td>{order.fooditem}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.price}</td>
                                    <td>
                                            <button onClick={() => handleDelete(order._id)} className="OnlineOrder-DeleteButton">Delete</button>
                                            <Link to={`/inventory/onlineOrd/update/${order._id}`} ><button className="OnlineOrder-UpdateButton">Update</button></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br /><br /><br />

                </div>
        </div>
    )
}

export default ManageOrder;