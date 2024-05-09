import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid, Paper, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import exampleImage from '../Assests/example.jpg';

// import QRCode from 'react-qr-code'; // Import the QRCode component

import QRCode from 'qrcode.react'; // Import the QRCode component

import '../component/Mybookingstyle.css';
import axios from "axios";
import Navbar from "../component/Navbar";
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const MyBookings = () => {
    // Get the URL parameter
    const { id } = useParams(); 
    // Get user from authentication context
    const {user} = useAuthContext()
    console.log("userr",user)
    // State to store bookings data
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                // Extract user email
                const userr = user.email
                console.log("u",userr)

                // Fetch bookings data for the current user and restaurant
                const response = await axios.get(`/api/booking/books?userId=${userr}&restaurantId=${id}`);

                // Extract data from response and update state
                const data = response.data;
                console.log("my bookinggg",response.data)
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchMyBookings();
    }, []); // Empty dependency array ensures useEffect runs only once on component mount


    // Function to handle deleting a booking
    const handleDeleteBooking = async (bookingId) => {
        try {
            // Send DELETE request to delete the booking
            await axios.delete(`/api/booking/${bookingId}`);

            // Filter out the deleted booking from the state
            setBookings(bookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return (
        <div className="myBookings">
            <Navbar />
            <div className="bookings">
                {bookings && bookings.map((booking) => (
                    <div className="booking-details" key={booking._id}>
                        <Paper sx={{ width: '1000px', pt: '10px', mt: '100px', ml: '40px', mr: '40px', bgcolor: 'lightgrey' }}>
                            <Grid container spacing={2}>
                                <Grid sx={{ pr: '16px' }} item md={5}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ width: '400px', flex: '1 0 auto' }}>
                                            <div className="input-container">
                                                <label className='input-mybooking-label'>Name</label>
                                                <label className='input-mybooking'>{booking.name}</label>
                                            </div>
                                            <div className="input-container">
                                                <label className='input-mybooking-label'>Telephone No</label>
                                                <label className='input-mybooking'>{booking.telephoneno}</label>
                                            </div>
                                            <div className="input-container">
                                                <label className='input-mybooking-label'>Date</label>
                                                <label className='input-mybooking'>{booking.date}</label>
                                            </div>
                                            <div className="input-container">
                                                <label className='input-mybooking-label'>Time</label>
                                                <label className='input-mybooking'>{booking.time}</label>
                                            </div>
                                        </CardContent>
                                    </Box>
                                </Grid>

                                <Grid item md={7}>
                                    <Grid container spacing={2}>
                                        <Grid item md={3}>
                                            <h7>Group Table</h7>
                                            <Box className='mybookings-tables-count'>{booking.groupquantity}</Box>
                                        </Grid>
                                        <Grid item md={3}>
                                            <h7>Couple Table</h7>
                                            <Box className='mybookings-tables-count'>{booking.couplequantity}</Box>
                                        </Grid>
                                        <Grid item md={6}>

                                            {/* Create a link to the dine-in form page with booking ID */}
                                            <QRCode value={`http://localhost:3000/dine-in-form/${booking._id}`} style={{ marginLeft: '76px', marginTop: '58px' }}/>


                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>

                            <p>{booking.createAt}</p>
                            <Button variant="contained" className='mybookings-delete' onClick={() => handleDeleteBooking(booking._id)}>Delete</Button>

                            <Button variant="contained" sx={{bgcolor: 'red', ml:'750px'}} className='mybookings-update'><Link to={`/update-pre-booking/${booking._id}`}>Update</Link></Button>
                        </Paper>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyBookings;
