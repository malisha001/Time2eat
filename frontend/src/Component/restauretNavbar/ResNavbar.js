import React from "react";
import { useState,useEffect } from "react";
import './NavbarStyle.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome, faBars, faList, faBowlFood, faNoteSticky, faComments, faRightFromBracket, faCircle} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import HistoryIcon from '@mui/icons-material/History';
import {useLogout} from '../../hooks/useLogout'
import { useNavigate } from "react-router-dom";

const ResNavbar = () => {
    const {logout} = useLogout()
    const navigate = useNavigate()

    const logouthandle = () => {
        logout()
        navigate('/')
    }
    return(
        <nav className="inv-sidebar">

            <p><img src="/Time2eat.jpeg" alt="logo" /><h1>TIME<strong>2eat</strong></h1></p>

            <ul>
                <li><Link to={"/restaurentDashbord"}><FontAwesomeIcon icon={faHome} />Dashboard</Link></li>
                <li><Link to ={"/inventory/reOrderitem"}><FontAwesomeIcon icon={faBars} />profile</Link></li> 
                <li><Link to={"/inventory/items"}><FontAwesomeIcon icon={faList} />inventory</Link></li>
                <li><Link to ={"/inventory/addItems"}><FontAwesomeIcon icon={faBowlFood} />employee</Link></li>
                <li><Link to={"/fooditems"}><FontAwesomeIcon icon={faNoteSticky} />menu</Link></li>
                <li><Link to={"/dine-in-form"}><FontAwesomeIcon icon={faComments} />resiption staff</Link></li>
                <li><Link to={"/dinein"}><FontAwesomeIcon icon={faComments} />dine in</Link></li>
                <button className="inv-navButton" onClick={logouthandle}><FontAwesomeIcon icon={faRightFromBracket}/>Logout</button>
            </ul>
        </nav>
    )
}

export default ResNavbar;