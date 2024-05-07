import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import './updOnline.css';

function UpdateOnlineOrderMan() {
    const { id } = useParams();

    const [orderId, setOrderId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [prc, setPrc] = useState("");





    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/onlineOrders/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                console.log(data);

                
                setOrderId(data.orderid);
                setCustomerName(data.cusName);
                setItemName(data.fooditem);
                setQuantity(data.quantity);      
                setPrc(data.price);

            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id])

    const navigate = useNavigate() 

    const handleUpdate = async (e) => {
        e.preventDefault();



        try {
            const response = await axios.patch(`/api/onlineOrders/rider/${id}`, {
                orderid:orderId,
                cusName: customerName,
                fooditem: itemName,
                quantity:quantity,
                price: prc,
             
            });
            console.log(response.data);

            navigate('/inventory/invMgOrd');
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    }

    return (
        <div className="formUpdate">
            <h1>Update your Online Order details here,</h1>
            <hr />
            <form className="Formcreate" onSubmit={handleUpdate}>
              

                <label>Order ID :</label>
                <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />

                <label>Customer Name :</label>
                <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
             

                <label>Item Name :</label>
                <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />

                <label>Item Quantity :</label>
                <input
                    type="Number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <label>Item Price (Rs.) :</label>
                <input
                    type="Number"
                    value={prc}
                    onChange={(e) => setPrc(e.target.value)}
                />
                

                <br />
                <button className="updateButton">Update Item</button>
            </form>
        </div>
    );
}

export default UpdateOnlineOrderMan;