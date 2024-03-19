import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBookingForm = ({ availableTables, selectedDateTime, customerID }) => {
    const [couplequantity, setCouplequantity] = useState('');
    const [groupquantity, setGroupquantity] = useState('');
    const [error, setError] = useState(null);
    const [coupletable, setCoupleTable] = useState('');
    const [grouptable, setGroupTable] = useState('');
    console.log(availableTables)
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get(`/api/booking/${customerID}`);
                const { coupletable, grouptable } = response.data;
                setCoupleTable(coupletable);
                setGroupTable(grouptable);   
            } catch (error) {
                console.error("Error fetching data: ", error); 
            }
        };
        
        fetchBookingData();
    }, [customerID]);


    console.log(coupletable)
    console.log(grouptable)
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const totalCoupleTablesRequested = parseInt(couplequantity);
        const totalGroupTablesRequested = parseInt(groupquantity);
        console.log(totalCoupleTablesRequested)
        console.log(totalGroupTablesRequested)

        const availablecoupletables = availableTables.couple - coupletable;
        const availablegrouptables = availableTables.group - grouptable;

        console.log(availablecoupletables)
        console.log(availablegrouptables)

        // Check if the requested couple tables exceed the available couple tables
        if (totalCoupleTablesRequested > availablecoupletables) {
            setError('The requested couple table count exceeds the available couple tables.');
            return;
        }
    
        // Check if the requested group tables exceed the available group tables
        if (totalGroupTablesRequested > availablegrouptables) {
            setError('The requested group table count exceeds the available group tables.');
            return;
        }
    
        const booking = { 
            id: customerID,
            date: selectedDateTime.date, 
            couplequantity: couplequantity, 
            groupquantity: groupquantity, 
            time: selectedDateTime.time 
        };
    
        try {
            const response = await axios.patch(`/api/booking/${customerID}`, booking);
            const json = response.data;
    
            if (response.status === 200) {
                setCouplequantity('');
                setGroupquantity('');
                setError(null);
                console.log('Booking updated', json);
            } else {
                setError(json.error);
            }
        } catch (error) {
            console.error('Error updating booking:', error);
            setError('An error occurred while updating the booking.');
        }
    };

    return ( 
        <form className="update" onSubmit={handleSubmit}>
            <h3>Update Booking</h3>

            <label>Couple Tables:</label>
            <input 
               type="number"
               onChange={(e) => setCouplequantity(e.target.value)}
               value={couplequantity}
            />

            <label>Group Tables:</label>
            <input 
               type="number"
               onChange={(e) => setGroupquantity(e.target.value)}
               value={groupquantity}
            />

            <button>Update Booking</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
};
 
export default UpdateBookingForm;
