import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './foodItem.css'

const Home = () => {
    const [items, setItems] = useState(null)

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const response = await fetch('/api/inventory/')
            const json = await response.json()
            console.log("inventory", json)

            if (response.ok) {
                setItems(json)
            }
        }
        fetchInventoryItems()
    }, [])

    const handleDelete = async (itemId) => {
        const response = await fetch('/api/inventory/' + itemId, {
            method: 'DELETE'
        });
        if (response.ok) {
            // Remove the deleted item from the items state
            setItems(items.filter(item => item._id !== itemId));
        }
    };

    return (

          
   
            <div className="home"> 
                <h1>Welcome to TIME<strong>2eat</strong> Food Item Lists</h1>
                <hr />
                <h4>Given below are the food items,</h4>
                    <div className="items">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item ID</th>
                                    <th>Item Name</th>
                                    <th>Item Quantity</th>
                                    <th>Item Price</th>
                                    <th>Item Category</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {items && items.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.itemId}</td>
                                        <td>{item.itemName}</td>
                                        <td>{item.itemQuantity}</td>
                                        <td>{item.itemPrice}</td>
                                        <td>{item.itemCategory}</td>
                                        <td>
                                            <button onClick={() => handleDelete(item._id)}>Delete</button>
                                            <Link to={`/inventory/update/${item._id}`}><button className="update-button">Update</button></Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <br /><br /><br />
               
            </div>
  
    )
}

export default Home;
