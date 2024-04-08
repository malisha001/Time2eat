import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Grid, Paper} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import exampleImage from '../Assests/example.jpg';
import '../Component/Mybookingstyle.css';
import axios from "axios";


// components
// import BookingForm from '../Component/Bookingform';
import BookingDetails from '../component/BookingDetails'

const MyBookings = () => {
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const response = await axios.get('/api/booking');
                const data = response.data;
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchMyBookings();
    }, []);

    const handleDeleteBooking = async (bookingId) => {
        try {
            await axios.delete(`/api/booking/${bookingId}`);
            setBookings(bookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return ( 
        <div className="myBookings">
            <div className="bookings">
                {bookings && bookings.map((booking) => (
                    <div className="booking-details" key={booking._id}>
                        <Paper sx={{width: '1000px',pt:'10px', mt: '100px', ml: '40px', mr: '40px', bgcolor:'#ffffff'}}>
                <Grid container spacing={2}>
                    <Grid sx={{pr: '16px'}} item md={5}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ width:'400px', flex: '1 0 auto' }}>
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
                                <CardMedia
                                    component="img"
                                    sx={{ ml: '50px', pt:'10px', pb:'10px', height: 200, width: 200, }}
                                    image={exampleImage}
                                    alt="Live from space album cover"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>

                <p>{booking.createAt}</p>
                        <button className='mybookings-delete' onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                        
                        <button className='mybookings-update'><Link to={`/update-pre-booking/${booking._id}`}>Update</Link></button>
            </Paper>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};
 
export default MyBookings;
