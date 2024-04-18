import React, { useState, useEffect } from 'react';
import { getOngoingOrder } from '../services/api';

function Payment() {
    const [ridDetails, setRiderDetails] = useState(null);

    useEffect(() => {
        const fetchRiderDetails = async () => {
            try {
                const riderDetails = await getOngoingOrder();
                
                setRiderDetails(riderDetails.riderId);
                console.log(ridDetails);
            } catch (error) {
                console.error('Error fetching rider details:', error);
            }
        	
        }
        fetchRiderDetails();
    }, []);
    return (
        <div>
            <h1>Payment Page</h1>
            <p>your rider is: {ridDetails}</p>
        </div>
    );
}

export default Payment;