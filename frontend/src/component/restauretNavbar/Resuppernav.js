import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faHouseFire, faUser} from '@fortawesome/free-solid-svg-icons'
import './Resuppernav.css'
import { useAuthContext } from '../../hooks/useAuthContext';

function RestaurantNavbar() {
    const {user} = useAuthContext()

    return (
        <div>
            <div className="dash-Upper">
                <div className="da-head1">
                    <h2><FontAwesomeIcon icon={faHouseFire} />welcome {user&&user.resName}</h2>{/* Restaurent Name */}
                </div>
                <div className="da-head2">
                    <h1><FontAwesomeIcon icon={faUser} />{user&&user.Email_address}</h1>{/* Manager Name */}
                </div>
            </div>
            <hr />
        </div>
    );
}

export default RestaurantNavbar;