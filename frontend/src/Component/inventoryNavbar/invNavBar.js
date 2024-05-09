import React from "react";
import { useState,useEffect } from "react";
import './invNavBar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faBars, faList, faBowlFood, faNoteSticky, faComments, faRightFromBracket, faCircle} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";



const Navbar = () => {


    const [showAlert, setShowAlert] = useState(false);
    const [rItems, setRItems] = useState(null);


    useEffect(() => {
        const alertReoder = async () => {
            
            try {
                const response = await fetch('/api/usage');
                if (!response.ok) {
                    throw new Error('Failed to fetch reorder items');
                }
                const json = await response.json();
                console.log("reorder", json);
                setRItems(json);
                // Check if any item meets the condition
                const hasItemsToReorder = json.some(item => item.remainingQuant <= item.reOrderQuan);
                setShowAlert(hasItemsToReorder);
            } catch (error) {
                console.error('Error fetching reorder items:', error);
            }
        }

        alertReoder()
    },[])


    return(
        <nav className="inv-sidebar">

            <p><img src="/Time2eat.jpeg" alt="logo" /><h1>TIME<strong>2eat</strong></h1></p>

            <ul>
                <li><Link to={"/inventory/dashboard"}><FontAwesomeIcon icon={faHome} />Dashboard</Link></li>
                <li><Link to ={"/inventory/reOrderitem"}><FontAwesomeIcon icon={faBars} />Re-order Details{showAlert && <FontAwesomeIcon icon={faCircle} style={{color:'#9b2121'}} /> }</Link></li> 
                <li><Link to={"/inventory/invMgOrd"}><FontAwesomeIcon icon={faList} />Manage Orders</Link></li>
                <li><Link to ={"/inventory/addItems"}><FontAwesomeIcon icon={faBowlFood} />Add Food Item</Link></li>
                <li><Link to={"/inventory/items/"}><FontAwesomeIcon icon={faNoteSticky} />Food Items</Link></li>
                <li><Link to={"/inventory/usage/"}><FontAwesomeIcon icon={faComments} />Daily Usage</Link></li>
                <button className="inv-navButton"><Link><FontAwesomeIcon icon={faRightFromBracket}/>Logout</Link></button>
            </ul>
        </nav>
    )
}

export default Navbar;