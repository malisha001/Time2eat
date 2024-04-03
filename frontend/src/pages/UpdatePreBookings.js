import React, { useState, useEffect } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBookingPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState(null);
    const [totalCoupleTablesBooked, setTotalCoupleTablesBooked] = useState(0);
    const [totalGroupTablesBooked, setTotalGroupTablesBooked] = useState(0);
    const [availableTables, setAvailableTables] = useState({ couple: 0, group: 0 });
    // const [availableGroupTables, setAvailableGroupTables] = useState(0);
    // const [availableCoupleTables, setAvailableCoupleTables] = useState(0);
    const [couplequantity, setCouplequantity] = useState('');
    const [groupquantity, setGroupquantity] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get(`/api/booking/${id}`);
                const { date, time, couplequantity, groupquantity } = response.data;
                setDate(date);
                setTime(time);
                setCouplequantity(couplequantity)
                setGroupquantity(groupquantity)

            } catch (error) {
                console.error("Error fetching data: ", error); 
            }
        };
        
        fetchBookingData();
    }, [id]);

    useEffect(() => {
        if (selectedDateTime && selectedDateTime.date && selectedDateTime.time) {
            fetchBookings(selectedDateTime.date, selectedDateTime.time);
        }
    }, [selectedDateTime]);

    const fetchBookings = async (date, time) => {
        try {
            const response = await axios.get(`/api/booking`, { params: { date, time } });
            const filteredBookings = response.data.filter(booking => booking.date === date && booking.time === time);
            const coupleTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.couplequantity, 0);
            const groupTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.groupquantity, 0);

            console.log(coupleTablesBooked);
            console.log(groupTablesBooked);

            
            setTotalCoupleTablesBooked(coupleTablesBooked);
            setTotalGroupTablesBooked(groupTablesBooked);

            // Calculate available tables by subtracting total tables booked from maximum available tables
            const availableCoupleTables = (10 - coupleTablesBooked) + couplequantity; // Max available couple tables minus tables already booked and those requested
            const availableGroupTables = (15 - groupTablesBooked) + groupquantity; // Max available group tables minus tables already booked and those requested
            
            // Update the available tables state
            setAvailableTables({ couple: availableCoupleTables, group: availableGroupTables });
        } catch (error) {
            console.error(error);
        }
    };

    const handleDate = (event) => {
        setDate(event.target.value);
    };

    const handleTime = (event) => {
        setTime(event.target.value);
    };

    const handleSubmitCheckAvailability = (event) => {
        event.preventDefault();
        setSelectedDateTime({ date, time });
    };

    const handleSubmitUpdateBooking = async (e) => {
        e.preventDefault();
    
        const totalCoupleTablesRequested = parseInt(couplequantity);
        const totalGroupTablesRequested = parseInt(groupquantity);

        console.log(totalCoupleTablesRequested)
        console.log(totalGroupTablesRequested)
        
        // const availableCoupleTables = 10 - (availableTables.couple + totalCoupleTablesRequested);
        // const availableGroupTables = 15 - (availableTables.group + totalGroupTablesRequested);

        if (totalCoupleTablesRequested > availableTables.couple ) {
            setError('The requested couple table count exceeds the available couple tables.');
            return;
        }
    
        if (totalGroupTablesRequested > availableTables.group ) {
            setError('The requested group table count exceeds the available group tables.');
            return;
        }
    
        const booking = { 
            id,
            date: selectedDateTime.date, 
            couplequantity: couplequantity, 
            groupquantity: groupquantity, 
            time: selectedDateTime.time 
        };
    
        try {
            const response = await axios.patch(`/api/booking/${id}`, booking);
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

        navigate("/");
    };

    return (
        <div>
            <h2>Check Tables Availability</h2>
            <form onSubmit={handleSubmitCheckAvailability}>
                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={handleDate}
                    required
                />
                <label htmlFor="time">Time:</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={handleTime}
                    required
                />
                <button type="submit">Check Availability</button>
    
                {selectedDateTime && (
                    <div>
                        <p>Selected Date: {selectedDateTime.date}</p>
                        <p>Selected Time: {selectedDateTime.time}</p>
                        <p>Total Couple tables available: {availableTables.couple}</p>
                        <p>Total Group tables available: {availableTables.group}</p>
                    </div>
                )}
            </form>

            <form className="update" onSubmit={handleSubmitUpdateBooking}>
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
        </div>
    );
};

export default UpdateBookingPage;
