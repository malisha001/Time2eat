import React from 'react';
import './Ridernav.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome,faBars, faUser, faList, faBowlFood, faNoteSticky, faComments, faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import {useLogout} from '../../hooks/useLogout'
import { useNavigate } from "react-router-dom";

function Ridernav() {
    const {logout} = useLogout()
    const navigate = useNavigate()

    const logouthandle = () => {
        logout()
        navigate('/')
    }
    return (
        <nav className="inv-sidebar">

            <p><img src="/Time2eat.jpeg" alt="logo" /><h1>TIME<strong>2eat</strong></h1></p>

            <ul>
                <li><Link to={"/restaurentDashbord"}><FontAwesomeIcon icon={faHome} />Dashboard</Link></li>
                <li><Link to ={"/riderdashborad/ongoingorder"}><FontAwesomeIcon icon={faBars} />ongoing orders</Link></li> 
                <li><Link to={"#"}><FontAwesomeIcon icon={faList} />order history</Link></li>
                <button className="inv-navButton" onClick={logouthandle}><FontAwesomeIcon icon={faRightFromBracket}/>Logout</button>
            </ul>
        </nav>
    );
}

export default Ridernav;