import React from "react";
import './Admin.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faBars, faList, faBowlFood, faNoteSticky, faComments, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Admin = () => {

    return(
        <nav className="sidebar">

            <p><img src="/Time2eat.jpeg" alt="logo" /><h1>TIME<strong>2eat</strong></h1></p>

            <ul>
                <li><Link to ={"/restaurants"}><FontAwesomeIcon icon={faHome} />Restaurants</Link></li> 
                <li><Link to={"/inventory/items/"}><FontAwesomeIcon icon={faNoteSticky} />Food Items</Link></li>
                <li><Link to={"/feedback"}><FontAwesomeIcon icon={faComments} />Feedbacks</Link></li>
                <button className="navButton"><Link><FontAwesomeIcon icon={faRightFromBracket}/>Logout</Link></button>
            </ul>
        </nav>
    )
}

export default Admin;