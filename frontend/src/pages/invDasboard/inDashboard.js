import './dashB.css'
import Navbar from '../../component/inventoryNavbar/invNavBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faHouseFire, faUser} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';


const Dash = () => {

    const [items,setItems] =useState("");
    const [rItems,setRItems] = useState("");
    const [totalCategoryCount, setTotalCategoryCount] = useState(0);
    const [orders, setOrders] = useState(null);
    const [rSitem, setRSitem] = useState(null)

    useEffect(() => {
        const fetchInventoryItems = async () => {
            const response = await fetch('/api/inventory/')
            const json = await response.json()
            console.log("inventory", json)

            if (response.ok) {
                setItems(json);
                updateTotalCategoryCount(json);
            }
        }

        const updateTotalCategoryCount = (items) => {
            const categories = new Set(items.map(item => item.itemCategory));
            setTotalCategoryCount(categories.size);
        };

        const fetchReorderItems = async () => {
            try {
                const response = await fetch('/api/usage');
                if (!response.ok) {
                    throw new Error('Failed to fetch reorder items');
                }
                const json = await response.json();
                console.log("reorder", json);
                // Filter items where remaining quantity is less than or equal to reorder quantity
                const filteredJson = json.filter(item => item.remainingQuant <= item.reOrderQuan);
                setRItems(filteredJson);
            } catch (error) {
                console.error('Error fetching reorder items:', error);
            }
        }

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

        const fetchCompletedRestock = async () => {
            const response = await fetch('/api/reorder/')
            const json = await response.json()
            console.log("reOrder", json)

            if (response.ok) {
                setRSitem(json);
            }
        }
      
    
        fetchOnlineOrders();
        fetchReorderItems();
        fetchInventoryItems()
        fetchCompletedRestock();


    }, [])

    const totalItems = items ? items.length : 0;
    const totalReorderItems = rItems ? rItems.length : 0;
    const totalOnlineOrders = orders ? orders.length : 0;
    const totalRestock = rSitem ? rSitem.length : 0;
    

    return(
        <div>
            <Navbar/>
                
                <div className="Inv-dashborad">

                    <div className="dash-Upper">
                        <div className="da-head1">
                            <h1><FontAwesomeIcon icon={faHouseFire} />Restaurent Name</h1>{/* Restaurent Name */}
                            <h4>Inventory</h4>
                        </div>
                        <div className="da-head2">
                            <h1><FontAwesomeIcon icon={faUser} />Manager Name</h1>{/* Manager Name */}
                            <h4>Inventory Manager</h4>
                        </div>
                    </div>
                    <hr />
                    <div className="dash-center">
                        <h1>INVENTORY STATUS</h1>
                            <div className="Boxes-One">
                                <div className="box1">
                                    <h1>Categories</h1>   
                                    <h3>{totalCategoryCount}</h3>
                                </div>
                                <div className="box1">
                                    <h1>Inventory Shortage</h1>
                                    <h3>{totalReorderItems}</h3>
                                </div>
                                <div className="box1">
                                    <h1>Total Products</h1>
                                    <h3>{totalItems}</h3>
                                </div>
                            </div>
                            
                        <hr />
                        <h1>ORDER STATUS</h1>
                        <div className="Boxes-One">
                                <div className="box2">
                                    <h1>Order Requests</h1>
                                    <h3>{totalOnlineOrders}</h3>
                                </div>
                                <div className="box2">
                                    <h1>Re-Stocks</h1>
                                    <h3>{totalRestock}</h3>
                                </div>
                            </div>
                    </div>

                </div>

        </div>
    )
}

export default Dash;