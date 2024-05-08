import React from 'react';
import './restaurentDasbord.css'
import Navbar from '../../component/restauretNavbar/ResNavbar';
import Resuppernav from '../../component/restauretNavbar/Resuppernav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faHouseFire, faUser} from '@fortawesome/free-solid-svg-icons'

function RestaurantDashboard() {

    return (
        <div>
            <div>
                <Navbar/>
                <div className="Inv-dashborad">
                    <Resuppernav/>
                    <div className="dash-center">
                        <h1>INVENTORY STATUS</h1>
                            <div className="Boxes-One">
                                <div className="box1">
                                    <h1>Categories</h1>
                                </div>
                                <div className="box1">
                                    <h1>Inventory Shortage</h1>
                                </div>
                                <div className="box1">
                                    <h1>Total Products</h1>
                                    
                                </div>
                            </div>
                            
                        <hr />
                        <h1>ORDER STATUS</h1>
                        <div className="Boxes-One">
                                <div className="box1">
                                    <h1>Order Requests</h1>
                                </div>
                                <div className="box1">
                                    <h1>Completed Orders</h1>
                                </div>
                                <div className="box1">
                                    <h1>Re-Stocks</h1>
                                </div>
                            </div>
                    </div>

                </div>

        </div>
        </div>
    );
}

export default RestaurantDashboard;