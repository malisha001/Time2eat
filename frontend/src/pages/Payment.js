import React, { useState, useEffect } from 'react';
import { getOngoingOrder } from '../services/api';

function Payment() {
    const [riderDetails, setRiderDetails] = useState(null);

    useEffect(() => {
        const fetchRiderDetails = async () => {
            try {
                const riderDetails = await getOngoingOrder();
                console.log(riderDetails);
                setRiderDetails(riderDetails.riderId);
            } catch (error) {
                console.error('Error fetching rider details:', error);
            }
        	
        }
        fetchRiderDetails();
    }, []);
    return (
        <div>
            <h1>Payment Page</h1>
            <p>your rider is: {riderDetails}</p>
        </div>
    );
}

export default Payment;