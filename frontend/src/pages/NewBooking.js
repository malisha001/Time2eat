// NewBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


// material ui 

// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';

const NewBooking = () => {
    const [selectedDateTime, setSelectedDateTime] = useState({ date: '', time: '' });
    const [availableTables, setAvailableTables] = useState({ couple: 10, group: 15 });
    const [totalCoupleTablesBooked, setTotalCoupleTablesBooked] = useState(0);
    const [totalGroupTablesBooked, setTotalGroupTablesBooked] = useState(0);
    const [couplequantity, setCouplequantity] = useState('');
    const [groupquantity, setGroupquantity] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedDateTime.date && selectedDateTime.time) {
            fetchBookings(selectedDateTime.date, selectedDateTime.time);
        }
    }, [selectedDateTime]);

    const handleCheckAvailability = async (e) => {
        e.preventDefault();
        fetchBookings(selectedDateTime.date, selectedDateTime.time);
    };

    const handleAddBooking = async (e) => {
        e.preventDefault();
        const totalCoupleTablesRequested = parseInt(couplequantity);
        const totalGroupTablesRequested = parseInt(groupquantity);

        // Check if the requested couple tables exceed the available couple tables
        if (totalCoupleTablesRequested > availableTables.couple) {
            setError('The requested couple table count exceeds the available couple tables.');
            return;
        }

        // Check if the requested group tables exceed the available group tables
        if (totalGroupTablesRequested > availableTables.group) {
            setError('The requested group table count exceeds the available group tables.');
            return;
        }

        const booking = { 
            time: selectedDateTime.time,
            date: selectedDateTime.date, 
            couplequantity: couplequantity, 
            groupquantity: groupquantity, 
        };

        try {
            const response = await axios.post('/api/booking', booking);
            const json = response.data;

            if (response.status === 200) {
                setCouplequantity('');
                setGroupquantity('');
                setError(null);
                console.log('New booking added', json);
            } else {
                setError(json.error);
            }
        } catch (error) {
            console.error('Error adding booking:', error);
            setError('An error occurred while adding the booking.');
        }
    };

    const fetchBookings = async (date, time) => {
        try {
            const response = await axios.get(`/api/booking`, { params: { date, time} });
            const filteredBookings = response.data.filter(booking => booking.date === date && booking.time === time);
            const coupleTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.couplequantity, 0);
            const groupTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.groupquantity, 0);
            setTotalCoupleTablesBooked(coupleTablesBooked);
            setTotalGroupTablesBooked(groupTablesBooked);

            // Calculate available tables by subtracting total tables booked from maximum available tables
            const availableCoupleTables = 10 - coupleTablesBooked; // Max available couple tables minus tables already booked
            const availableGroupTables = 15 - groupTablesBooked; // Max available group tables minus tables already booked

            // Update the available tables state
            setAvailableTables({ couple: availableCoupleTables, group: availableGroupTables });
        } catch (error) {
            console.error(error);
        }
    };

    return ( 
        
        <div className="newbooking">
            <h1>Reserve Table</h1>
            {/* <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Lizard
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card> */}
            <div className="bookings">
                <h2>Check Tables Availability</h2>
                <form onSubmit={handleCheckAvailability}>
                    <label>Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDateTime.date}
                        onChange={(e) => setSelectedDateTime({ ...selectedDateTime, date: e.target.value })}
                        required
                    />
                    <label>Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={selectedDateTime.time}
                        onChange={(e) => setSelectedDateTime({ ...selectedDateTime, time: e.target.value })}
                        required
                    />
                    <button type="submit">Check Availability</button>
                </form>
                <p>Total Couple tables booked: {totalCoupleTablesBooked}</p>
                <p>Total Group tables booked: {totalGroupTablesBooked}</p>
                <form className="create" onSubmit={handleAddBooking}>
                    <h3>Add a New Booking</h3>

                    <label>Couple Tables:</label>
                    <input 
                        type="number"
                        onChange={(e) => setCouplequantity(e.target.value)}
                        value={couplequantity}/>

                    <label>Group Tables:</label>
                    <input 
                        type="number"
                        onChange={(e) => setGroupquantity(e.target.value)}
                        value={groupquantity}/>

                    <button>Add Booking</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default NewBooking;
