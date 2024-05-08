import React, { useState, useEffect } from "react";
import {Card, Button} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid,Box,Paper } from '@mui/material';
import PreStyles from '../component/NewStyle.css'
import exampleImage from '../Assests/example.jpg'; // Adjust the path as per your directory structure
import grouptableimage from '../Assests/grouptable.jpg'; 
import coupletableimage from '../Assests/coupletable.jpg'; 

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
    const [couplequantity, setCouplequantity] = useState('');
    const [groupquantity, setGroupquantity] = useState('');
    const [name, setName] = useState('');
    const [telephoneno, setTelephoneNo] = useState('');
    const [nameError, setNameError] = useState(null);
    const [telError, setTelError] = useState(null);
    const [resid, setResid] = useState(null);
    const [tabledetails,settabledetails] = useState('')
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await axios.get(`/api/booking/${id}`);
                const { name,resid, date, time, couplequantity, groupquantity, telephoneno } = response.data;
                setDate(date);
                setResid(resid);
                setTime(time);
                setCouplequantity(couplequantity);
                setGroupquantity(groupquantity);
                setName(name);
                setTelephoneNo(telephoneno);

            } catch (error) {
                console.error("Error fetching data: ", error); 
            }
        };
        
        fetchBookingData();
    }, [id]);

    useEffect(()=>{
        //get tables from related restaurent
        const fetchtabledata = async () => {
            try {
                const tabledata = await axios.get(`/api/restaurants/${resid}`);
                settabledetails(tabledata.data)
                console.log("tablee details",tabledetails)

            } catch (error) {
                console.error('Error fetching table data:', error);
            }
        }
        fetchtabledata()
        
    },[resid]);


    console.log("initial couple table", tabledetails.Couple_table)
    console.log("initial group table", tabledetails.Group_table)
    console.log("hi res",resid)
    useEffect(() => {
        if (selectedDateTime && selectedDateTime.date && selectedDateTime.time) {
            fetchBookings(selectedDateTime.date, selectedDateTime.time);
        }
    }, [selectedDateTime]);

    const fetchBookings = async (date, time) => {
        try {
            const response = await axios.get(`/api/booking/${resid}`, { params: { date, time } });
            console.log("tablee", response)
            const filteredBookings = response.data.filter(booking => booking.date === date && booking.time === time);
            const coupleTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.couplequantity, 0);
            const groupTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.groupquantity, 0);
            
            console.log("couplee", coupleTablesBooked)
            console.log("groupee", groupTablesBooked)

            setTotalCoupleTablesBooked(coupleTablesBooked);
            setTotalGroupTablesBooked(groupTablesBooked);

            // Calculate available tables by subtracting total tables booked from maximum available tables
            const availableCoupleTables = (tabledetails.Couple_table - coupleTablesBooked) + couplequantity; // Max available couple tables minus tables already booked and those requested
            const availableGroupTables = (tabledetails.Group_table - groupTablesBooked) + groupquantity; // Max available group tables minus tables already booked and those requested
            
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
            name: name,
            date: selectedDateTime.date, 
            couplequantity: couplequantity, 
            groupquantity: groupquantity, 
            time: selectedDateTime.time,
            telephoneno: telephoneno 
        };
    
        if(!nameError && !telError){
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
    }
        else{
            setError("Please enter valid details");
        }

        
    };

    return (
        <div>
            <div>
                
          <Paper sx={{mt: '100px', ml: '40px', mr: '40px', bgcolor:'#ffffff'}}>
            <h1 className='pre-booking-heading'>Reserve Table</h1>
          <Grid container spacing={2}>
            <Grid sx={{pr: '16px'}} item md={8}>
              {/* nav bar */}
              <nav className='prebooking-bar'>
                  <ul>
                      <li className='PreDate'>Date</li>
                      <li className='PreDateInput'><input type='date' id="date"
                          value={date}
                          onChange={handleDate}
                          required/></li>
                      <li className='PreDate'>Time</li>

                        <li className='PreDateInput'>
                            <select
                                id="time"
                                value={time}
                                onChange={handleTime}
                                required
                            >
                                {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                                    <option key={hour} value={hour.toString().padStart(2, '0') + ':00'}>
                                        {hour.toString().padStart(2, '0') + ':00'}
                                    </option>
                                ))}
                            </select>
                        </li>

                      <Button sx={{marginTop: '12px', marginLeft: '288px', borderRadius: '20PX'}} variant="contained" onClick={handleSubmitCheckAvailability}> Check Now</Button>
                
                  </ul>
              </nav>

              <Card className='imgprebooking'  sx={{ maxWidth: 800 }}>
              <Grid container spacing={2} sx={{backgroundColor: 'lightgray'}}>
                    <Grid sx={{pr: '16px', ml: '30px', mr: '15px', mt: '20px'}} item md={12}>
                        <h2 className='form-header-pre-booking'>Book Your Table</h2>
                    </Grid>

                    <Grid sx={{ml: '0px', mt: '10px', ml: '30px', mr: '15px'}} container spacing={2}>
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
                                        sx={{ ml: '8px', pt:'0px', pb:'10px', height: 50, width: 50, }}
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
                                    <input className='pre-booking-form-table-input' type="number"
                   onChange={(e) => setGroupquantity(e.target.value)}
                   value={groupquantity}></input>
                                    </Grid>
                                  </Grid>

                                 
                                </Grid>
                                <Grid item md={6}>
                                <Grid container spacing={2}>
                                    <Grid item md={12}>
                                    <Box sx={{ width: '40px', height: '64px' }} className='form-card-subtitles-bottom-box'>  </Box> 
                                    </Grid>
                                  </Grid>
                                <Grid container spacing={2}>
                                    <Grid item md={6}>
                                    <Grid container spacing={2}>
                                        <Grid item md={6}>
                                        <CardMedia
                                        component="img"
                                        sx={{ ml: '22px', pt:'0px', pb:'10px', height: 50, width: 50, }}
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
                                    <input className='pre-booking-form-table-input' type="number"
                   onChange={(e) => setCouplequantity(e.target.value)}
                   value={couplequantity}></input>
                                    </Grid>
                                  </Grid>
                                </Grid>
                    </Grid>
                    <Grid sx={{ml: '30px', mt: '10px', mr: '15px'}} container spacing={2}>
                                <Grid item md={6}>
                                <Grid container spacing={2}>
                                    <Grid item md={12}>
                                    <h3 className='form-card-subtitles-bottom'>Enter Booking Details</h3>
                                    </Grid>
                                  </Grid>
                            <div>
                                <div className="input-container">
                                    <label className='input-mybooking-label'>Name</label>
                                    <input className='input-mybooking' type='text' onChange={(e) => {
                                        const value = e.target.value;
                                        if (!/^[a-zA-Z ]*$/.test(value)) {
                                        setNameError('Please enter a valid name (letters spaces only)');
                                        } else {
                                        setNameError('');
                                        }
                                        setName(value);
                                    }}
                                    value={name}
                                    sx={{ width: "100%" }} />
                                    </div>
                                    <div style={{margin:'-10px 0px 10px 20px'}}>
                                        {nameError && (
                                            <Typography variant="body2" color="error">
                                            {nameError}
                                            </Typography>
                                        )}
                                    </div>
                            </div>
                            <div>
                                <div className="input-container">
                                    <label className='input-mybooking-label'>Telephone</label>
                                    <input className='input-mybooking' type='text' onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (!/^\d{10}$/.test(value)) {
                                                            setTelError('Please enter a valid telephone number (10 digits)');
                                                        } else {
                                                            setTelError('');
                                                        }
                                                        setTelephoneNo(value);
                                                        }}
                                                        value={telephoneno}
                                                        sx={{ width: "100%" }} />
                                </div>
                              
                               <div style={{margin:'-10px 0px 10px 20px'}}>
                                                        {telError && (
                                                            <Typography variant="body2" color="error">
                                                                {telError}
                                                            </Typography>
                                                        )}
                                                    </div>
                               </div>
                                </Grid>
                                <Grid item md={6}>
                                <Grid sx={{pt:'45'}} container spacing={2}>
                                    <Grid sx={{pt:'45'}}item md={12}>
                                    <Box sx={{ height: '80px' }} className='form-card-subtitles-bottom-box'> <div className="input-container">
                                    <label className='input-mybooking-label'>Date</label>
                                    <label className='input-mybooking-label'>{selectedDateTime && selectedDateTime.date}</label>
                                </div>

                                <div className="input-container">
                                    <label className='input-mybooking-label'>Time</label>
                                    <label className='input-mybooking-label'>{selectedDateTime && selectedDateTime.time}</label>
                                </div>
 </Box>
                                    </Grid>
                                  </Grid>
                                <Button variant="contained" sx={{marginLeft: '250px', borderRadius: '20px'}} onClick={handleSubmitUpdateBooking}>proceed</Button>
                                {error && <div className="error">{error}</div>}
                                </Grid>
                    </Grid>

                </Grid>
              </Card>


            </Grid>
            
          <Grid item md={4}>
            <Box className='current-availability-side'>
            Current Availability
            </Box>
          
           <Grid container spacing={2}>
              <Grid item md={4}>            
              <Card className='availability-status-table-image' variant="elevation=0" sx={{ maxWidth: 100 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
                        image= {grouptableimage}
                        alt="green iguana"
                      />
                </CardActionArea>
              </Card>
              </Grid>
              <Grid item md={4}>            
              <Box className='availability-status-top'>
              Total</Box>
              <Box className='availability-status-bottom'>
              {tabledetails.Group_table}</Box>
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
                        image= {coupletableimage}
                        alt="green iguana"
                      />
                    </CardActionArea>
              </Card>
              </Grid>
              <Grid item md={4}>            
              <Box className='availability-status'>{tabledetails.Couple_table}</Box>
              </Grid>
              <Grid item md={4}>            
              <Box className='availability-status'>{availableTables.couple}</Box>
              </Grid>

            </Grid>
          </Grid>

        </Grid>
        </Paper>
        </div>
      {/* image  */}
      {/* vertical line */}
      
       <div className="vertical-line"></div>
        </div>
    );
};

export default UpdateBookingPage;
