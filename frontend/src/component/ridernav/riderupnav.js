import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faHouseFire, faUser} from '@fortawesome/free-solid-svg-icons'
import { useAuthContext } from '../../hooks/useAuthContext';

function RiderUpNav() {
    const {user} = useAuthContext()

    return (
        <div>
            <div className="dash-Upper">
                <div className="da-head1">
                    <h1><FontAwesomeIcon icon={faHouseFire} />welcome {user&&user.name}</h1>
                </div>
                <div className="da-head2">
                    <h1><FontAwesomeIcon icon={faUser} />{user&&user.email}</h1>{/* Manager Name */}
                </div>
            </div>
            <hr />
        </div>
    );
}

export default RiderUpNav;