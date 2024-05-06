import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper, Button } from '@mui/material';
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext';

const DineInBookings = () => {
    const { user } = useAuthContext();
    const [dineBookings, setDineBookings] = useState(null);  // State to store dine-in bookings data

     // Fetch dine-in bookings data when the component mounts or when user changes
    useEffect(() => {
        // Check if user and user.resId exist
        if (user && user.resId) {
            const fetchDineInBookings = async () => {
                try {
                    const response = await axios.get(`/api/realtimebooking/${user.resId}`);
                    const data = response.data;
                    setDineBookings(data);
                } catch (error) {
                    console.error('Error fetching Dine In Bookings:', error);
                }
            };

            fetchDineInBookings();
        }
    }, [user]); // Add user to the dependency array to re-fetch bookings when user changes

    // Function to handle deletion of a dine-in booking
    const handleClick = async (deleteDineBookings) => {
        try {
            // Sending DELETE request to delete the specified dine-in booking
            await axios.delete(`/api/realtimebooking/${deleteDineBookings}`);

            // Updating state to remove the deleted booking from dineBookings
            setDineBookings(prevBookings => prevBookings.filter(dineBooking => dineBooking._id !== deleteDineBookings));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    }

    return (
        <div>
            <TableContainer component={Paper} style={{ marginBottom: '20px', backgroundColor: 'lightgrey', marginTop: '40px' }}>
                <Table aria-label="simple table">
                    <TableHead sx={{bgcolor: 'lightblue'}}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Couple Tables</TableCell>
                            <TableCell>Group Tables</TableCell>
                            <TableCell>Telephone No</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dineBookings && dineBookings.map((dineBooking) => (
                            <TableRow key={dineBooking._id}>
                                <TableCell>{dineBooking.name}</TableCell>
                                <TableCell>{dineBooking.time}</TableCell>
                                <TableCell>{dineBooking.date}</TableCell>
                                <TableCell>{dineBooking.couplequantity}</TableCell>
                                <TableCell>{dineBooking.groupquantity}</TableCell>
                                <TableCell>{dineBooking.telephoneno}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleClick(dineBooking._id)} variant='contained'>Delete</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant='contained'><Link to={`/update-dine-in-booking/${dineBooking._id}`}>Update</Link></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default DineInBookings;
