import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, Card, CardActionArea, CardMedia, Box } from '@mui/material';
import axios from 'axios';
import QRCode from 'react-qr-code';
import exampleImage from '../Assests/example.jpg';
import grouptableimage from '../Assests/grouptable.jpg';
import coupletableimage from '../Assests/coupletable.jpg';
import { Link } from 'react-router-dom';
import '../component/Bookingformstyle.css';

const NewBooking = () => {
    const [selectedDateTime, setSelectedDateTime] = useState({ date: '', time: '' });
    const [availableTables, setAvailableTables] = useState({ couple: 10, group: 15 });
    const [totalCoupleTablesBooked, setTotalCoupleTablesBooked] = useState(0);
    const [totalGroupTablesBooked, setTotalGroupTablesBooked] = useState(0);
    const [couplequantity, setCouplequantity] = useState('');
    const [groupquantity, setGroupquantity] = useState('');
    const [name, setName] = useState('');
    const [telephoneno, setTelephoneNo] = useState('');
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showAvailability, setAvailability] = useState(false);
    const [tableCount, setTableCount] = useState({ couple: 0, group: 0 });

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/realtimebooking');
            
            // Calculate total tables for both couple and group
            const totalCoupleTables = response.data.reduce((total, table) => total + table.couplequantity, 0);
            const totalGroupTables = response.data.reduce((total, table) => total + table.groupquantity, 0);

            // Update table count state
            setTableCount({ couple: totalCoupleTables, group: totalGroupTables });
        } catch (error) {
            console.log('Error fetching table data:', error);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchData();

        // Set interval to fetch data every second
        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    ///////////////////////////////////////////////////////////

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

        if (totalCoupleTablesRequested > availableTables.couple) {
            setError('The requested couple table count exceeds the available couple tables.');
            return;
        }

        if (totalGroupTablesRequested > availableTables.group) {
            setError('The requested group table count exceeds the available group tables.');
            return;
        }

        const booking = {
            time: selectedDateTime.time,
            date: selectedDateTime.date,
            couplequantity: couplequantity,
            groupquantity: groupquantity,
            name: name,
            telephoneno: telephoneno
        };

        try {
            const response = await axios.post('/api/booking', booking);
            const json = response.data;

            if (response.status === 200) {
                setCouplequantity('');
                setGroupquantity('');
                setName('');
                setTelephoneNo('')
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

            const availableCoupleTables = 10 - coupleTablesBooked;
            const availableGroupTables = 15 - groupTablesBooked;

            setAvailableTables({ couple: availableCoupleTables, group: availableGroupTables });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <Paper sx={{ mt: '100px', ml: '40px', mr: '40px', bgcolor: '#ffffff' }}>
                    <h1 className='pre-booking-heading'>Reserve Table</h1>
                    <Grid container spacing={2}>
                        <Grid sx={{ pr: '16px' }} item md={8}>
                            <form onSubmit={handleCheckAvailability}>
                                <nav className='prebooking-bar'>
                                    <ul>
                                        <li className='PreDate'>Date</li>
                                        <li className='PreDateInput'><input
                                            type="date"
                                            id="date"
                                            value={selectedDateTime.date}
                                            onChange={(e) => setSelectedDateTime({ ...selectedDateTime, date: e.target.value })}
                                            required
                                        /></li>
                                        {/* <li className='PreDateInput'>
                                            <input
                                                type="time"
                                                id="time"
                                                value={selectedDateTime.time}
                                                onChange={(e) => setSelectedDateTime({ ...selectedDateTime, time: e.target.value })}
                                                step="3600"
                                                required
                                            />
                                        </li> */}

                                        {/* 24 hour format  */}

                                        <li className='PreDateInput'>
                                            <select
                                                id="time"
                                                value={selectedDateTime.time}
                                                onChange={(e) => setSelectedDateTime({ ...selectedDateTime, time: e.target.value })}
                                                required
                                            >
                                                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                                    <option key={hour} value={hour.toString().padStart(2, '0') + ':00'}>
                                                        {hour.toString().padStart(2, '0') + ':00'}
                                                    </option>
                                                ))}
                                            </select>
                                        </li>


                                        <Button onClick={() => {
                                                    setShowForm(!showForm);
                                                    setAvailability(!showAvailability);
                                                }}> Check Now</Button>
                                    </ul>
                                </nav>
                            </form>
                            {showForm ? (
                                <form className="create" onSubmit={handleAddBooking}>
                                <Paper sx={{ width: '850px', height: '360px', pt: '10px', mt: '40px', ml: '20px', mr: '40px', bgcolor: 'lightgrey', mb: '30px' }}>
                                    <Grid container spacing={2}>
                                        <Grid sx={{ pr: '16px', ml: '30px', mr: '15px', mt: '0px' }} item md={12}>
                                            <h2 className='form-header-pre-booking'>Book Your Table</h2>
                                        </Grid>
                                        <Grid sx={{ ml: '0px', mt: '0px', ml: '30px', mr: '15px' }} container spacing={2}>
                                            <Grid item md={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item md={12}>
                                                        <h3 className='form-card-subtitles'>Pick your table type</h3>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item md={6}>
                                                        <Grid container spacing={2}>
                                                            <Grid item md={6}>
                                                                <CardMedia
                                                                    component="img"
                                                                    sx={{ ml: '22px', pt: '0px', pb: '10px', height: 50, width: 50, }}
                                                                    image={grouptableimage}
                                                                    alt="Live from space album cover"
                                                                />
                                                            </Grid>
                                                            <Grid item md={6}>
                                                                <Box className='booking-form-img-descrption'>Table for 4</Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <input className='pre-booking-form-table-input' type='Number' onChange={(e) => setGroupquantity(e.target.value)}
                                                            value={groupquantity}></input>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item md={12}>
                                                        <Box sx={{ width: '40px', height: '64px' }} className='form-card-subtitles-bottom-box'> </Box>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={2}>
                                                    <Grid item md={6}>
                                                        <Grid container spacing={2}>
                                                            <Grid item md={6}>
                                                                <CardMedia
                                                                    component="img"
                                                                    sx={{ ml: '22px', pt: '0px', pb: '10px', height: 50, width: 50, }}
                                                                    image={coupletableimage}
                                                                    alt="Live from space album cover"
                                                                />
                                                            </Grid>
                                                            <Grid item md={6}>
                                                                <Box className='booking-form-img-descrption'>Table for 2</Box>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item md={6}>
                                                        <input className='pre-booking-form-table-input' type='Number' onChange={(e) => setCouplequantity(e.target.value)}
                                                            value={couplequantity}></input>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid sx={{ ml: '30px', mt: '0px', mr: '15px' }} container spacing={2}>
                                            <Grid item md={6}>
                                                <Grid container spacing={2}>
                                                    <Grid item md={12}>
                                                        <h3 className='form-card-subtitles-bottom'>Enter Booking Details</h3>
                                                    </Grid>
                                                </Grid>
                                                <div className="input-container">
                                                    <label className='input-mybooking-label'>Name</label>
                                                    <input className='input-mybooking' type='text' onChange={(e) => setName(e.target.value)}
                                                        value={name} ></input>
                                                </div>
                                                <div className="input-container">
                                                    <label className='input-mybooking-label'>Telephone</label>
                                                    <input className='input-mybooking' type='text' onChange={(e) => setTelephoneNo(e.target.value)}
                                                        value={telephoneno}></input>
                                                </div>
                                            </Grid>
                                            <Grid item md={6}>
                                                <Grid sx={{ pt: '45' }} container spacing={2}>
                                                    <Grid sx={{ pt: '45' }} item md={12}>
                                                        <Box sx={{ height: '80px' }} className='form-card-subtitles-bottom-box'>
                                                            <div className="input-container">
                                                                <label className='input-mybooking-label-date'>Date</label>
                                                                <label className='input-mybooking-label-time'>{selectedDateTime.date}</label>
                                                            </div>
                                                            <div className="input-container">
                                                                <label className='input-mybooking-label'>Time</label>
                                                                <label className='input-mybooking-label'>{selectedDateTime.time}</label>
                                                            </div>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                                <button className='pre-booking-form-btn-bottom'>proceed</button>
                                                {error && <div className="error">{error}</div>}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </form>
                            ) : (
                                <Card className='imgprebooking' sx={{ maxWidth: 850 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="380"
                                            image={exampleImage}
                                            alt="green iguana"
                                        />
                                    </CardActionArea>
                                </Card>
                            )}
                        </Grid>
                        <Grid item md={4}>
                            
                            <Box className='current-availability-side'>
                                Current Availability
                            </Box>
                            {showAvailability ? (
                              <Grid container spacing={2}>
                                <Grid item md={4}>
                                    <Card className='availability-status-table-image' variant="elevation=0" sx={{ maxWidth: 100 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={grouptableimage}
                                                alt="green iguana"
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item md={4}>
                                    <Box className='availability-status-top'>
                                        Total
                                    </Box>
                                    <Box className='availability-status-bottom'>
                                        15
                                    </Box>
                                </Grid>
                                <Grid item md={4}>
                                    <Box className='availability-status-top'>Available </Box>
                                    <Box className='availability-status-bottom'>{availableTables.group}</Box>
                                </Grid>
                                <Grid item md={4}>
                                    <Card className='availability-status-table-image' variant="elevation=0" sx={{ maxWidth: 100 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={coupletableimage}
                                                alt="green iguana"
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item md={4}>
                                    <Box className='availability-status'>10</Box>
                                </Grid>
                                <Grid item md={4}>
                                    <Box className='availability-status'>{availableTables.couple}</Box>
                                </Grid>
                            </Grid>
                            ) : (
                             <Grid container spacing={2}>
                                <Grid item md={4}>
                                    <Card className='availability-status-table-image' variant="elevation=0" sx={{ maxWidth: 100 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={grouptableimage}
                                                alt="green iguana"
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item md={4}>
                                    <Box className='availability-status-top'>
                                        Total
                                    </Box>
                                    <Box className='availability-status-bottom'>
                                        15
                                    </Box>
                                </Grid>
                                <Grid item md={4}>
                                    <Box className='availability-status-top'>In Restaurant</Box>
                                    <Box className='availability-status-bottom'>{tableCount.group}</Box>
                                </Grid>
                                <Grid item md={4}>
                                    <Card className='availability-status-table-image' variant="elevation=0" sx={{ maxWidth: 100 }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={coupletableimage}
                                                alt="green iguana"
                                            />
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                                <Grid item md={4}>
                                    <Box className='availability-status'>10</Box>
                                </Grid>
                                <Grid item md={4}>
                                    <Box className='availability-status'>{tableCount.couple}</Box>
                                </Grid>
                            </Grid>
                            )}
                            
                            <Link to="/mybookings">
                                <button>My Reservations</button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
            <div className="vertical-line"></div>
        </div>
    );
};

export default NewBooking;