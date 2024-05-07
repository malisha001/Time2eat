import './dashB.css'
import Navbar from '../../component/inventoryNavbar/invNavBar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faHouseFire, faUser} from '@fortawesome/free-solid-svg-icons'


const Dash = ({totalItems}) => {

    

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
                                </div>
                                <div className="box1">
                                    <h1>Inventory Shortage</h1>
                                </div>
                                <div className="box1">
                                    <h1>Total Products</h1>
                                    <h3>{totalItems}</h3>
                                    
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
    )
}

export default Dash;