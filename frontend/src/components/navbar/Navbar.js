import React from "react";
import './NavbarStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faBars, faList, faBowlFood, faNoteSticky, faComments, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Navbar = () => {

    return(
        <nav className="sidebar">

            <p><img src="/Time2eat.jpeg" alt="logo" /><h1>TIME<strong>2eat</strong></h1></p>

            <ul>
                <li><Link><FontAwesomeIcon icon={faHome} />Dashboard</Link></li>
                <li><Link to ={"/inventory/reOrderitem"}><FontAwesomeIcon icon={faBars} />Re-order Details</Link></li> 
                <li><Link><FontAwesomeIcon icon={faList} />Manage Orders</Link></li>
                <li><Link to ={"/inventory/addItems"}><FontAwesomeIcon icon={faBowlFood} />Add Food Item</Link></li>
                <li><Link to={"/inventory/items/"}><FontAwesomeIcon icon={faNoteSticky} />Food Items</Link></li>
                <li><Link to={"/inventory/usage/"}><FontAwesomeIcon icon={faComments} />Daily Usage</Link></li>
                <button className="navButton"><Link><FontAwesomeIcon icon={faRightFromBracket}/>Logout</Link></button>
            </ul>
        </nav>
    )
}

export default Navbar;