import React from 'react';
import './Ridernav.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faUser, faList, faBowlFood, faNoteSticky, faComments, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Ridernav() {
    return (
        <nav className="sidebar">

            <p><img src="/Time2eat.jpeg" alt="logo" /><h1>TIME<strong>2eat</strong></h1></p>

            <ul>
                <li><Link to ={"/riderdashborad/"}><FontAwesomeIcon icon={faHome} />Dashboard</Link></li>
                <li><Link to ={"/riderdashborad/ongoingorder"}><FontAwesomeIcon icon={faList} />ongoing order</Link></li>
                <li><Link to ={"/orderHistory"}><FontAwesomeIcon icon={faBowlFood} />order history</Link></li>
                <button className="navButton"><Link><FontAwesomeIcon icon={faRightFromBracket}/>Logout</Link></button>
            </ul>
        </nav>
    );
}

export default Ridernav;