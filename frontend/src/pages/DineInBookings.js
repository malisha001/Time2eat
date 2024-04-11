import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Paper, Button } from '@mui/material';
import axios from "axios";

const DineInBookings = () => {
    const [dineBookings, setDineBookings] = useState(null);

    useEffect(() => {
        const fetchDineInBookings = async () => {
            try {
                const response = await axios.get('/api/realtimebooking');
                const data = response.data;
                setDineBookings(data);
            } catch (error) {
                console.error('Error fetching Dine In Bookings:', error);
            }
        };

        fetchDineInBookings();
    }, []);

    const handleClick = async (deleteDineBookings) => {
        try {
            await axios.delete(`/api/realtimebooking/${deleteDineBookings}`);
            setDineBookings(prevBookings => prevBookings.filter(dineBooking => dineBooking._id !== deleteDineBookings));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    }

    return (
        <div>
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer ID</TableCell>
                            <TableCell>Res ID</TableCell>
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
                                <TableCell>{dineBooking.cusid}</TableCell>
                                <TableCell>{dineBooking.resid}</TableCell>
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
