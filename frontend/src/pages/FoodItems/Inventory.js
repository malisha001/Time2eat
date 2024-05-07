import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './foodItem.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import Navbar from "../../component/inventoryNavbar/invNavBar";



const Home = () => {
    const [items, setItems] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const response = await fetch('/api/inventory/')
            const json = await response.json()
            console.log("inventory", json)

            if (response.ok) {
                setItems(json);
                 
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

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter items based on search query
    const filteredItems = items ? items.filter(item => item.itemName.toLowerCase().startsWith(searchQuery.toLowerCase())) : [];

    const totalItems = items ? items.length : 0;

    return (
        
          
        <div> 
        <Navbar />
            <div className="home"> 
            
                <h1>Welcome to TIME<strong>2eat</strong> Food Item Lists</h1>
                <hr />
                <h4>Given below are the food items,</h4>

                <div className="foodItemSearch">
                    <FontAwesomeIcon icon={faSearch} className="foodSeacrhIcon" />
                    <input 
                    type="text" 
                    placeholder="Search any item here" 
                    value={searchQuery} 
                    onChange={handleSearch} 
                    className="Fsearch-bar"
                />
                </div>
                    <div className="items">
                    
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Quantity (Kg)</th>
                                    <th>Re-Order Level (Kg)</th>
                                    <th>Price (Rs.)</th>
                                    <th>Category</th>
                                    <th>Action</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.itemId}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.itemInitialQuantity}</td>
                                    <td>{item.reOrderitem}</td>
                                    <td>{item.itemPrice}</td>
                                    <td>{item.itemCategory}</td>
                                    <td>
                                            <button onClick={() => handleDelete(item._id)} className="invDeleteButton">Delete</button>
                                            <Link to={`/inventory/update/${item._id}`}><button className="update-button">Update</button></Link>
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

export default Home;
