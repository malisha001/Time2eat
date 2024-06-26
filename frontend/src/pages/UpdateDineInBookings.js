import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button, Box,AppBar,Toolbar,Typography,IconButton } from "@mui/material";
import { Link } from 'react-router-dom';

import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateDineInBooking = () => {
  const { id, resId } = useParams();
  const [selectedDateTime, setSelectedDateTime] = useState({ date: '', time: '' });
  const [couplequantity, setCouplequantity] = useState('');
  const [groupquantity, setGroupquantity] = useState('');
  const [name, setName] = useState('');
  const [telephoneno, setTelephoneNo] = useState('');
  const [availableTables, setAvailableTables] = useState({ couple: 0, group: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await axios.get(`/api/realtimebooking/${id}`);
        console.log("hi", response)
        const { name, date, time, couplequantity, groupquantity, telephoneno } = response.data;
        
        setName(name);
        setSelectedDateTime({ date, time });
        setCouplequantity(couplequantity);
        setGroupquantity(groupquantity);
        setTelephoneNo(telephoneno);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchBookingData();
  }, [id]);

  console.log(name !== null ? name : "Name is null");


  useEffect(() => {
    fetchAvailableTables();
  }, [couplequantity, groupquantity]);

  const fetchAvailableTables = async () => {
    try {
      const response = await axios.get(`/api/realtimebooking/${resId}`);
      const bookings = response.data;

      // Fetch restaurant data
      const restaurantResponse = await axios.get(`/api/restaurants/${resId}`);
      const restaurantData = restaurantResponse.data;

      const coupleTablesBooked = bookings.reduce(
        (acc, booking) => acc + booking.couplequantity,
        0
      );
      const groupTablesBooked = bookings.reduce(
        (acc, booking) => acc + booking.groupquantity,
        0
      );

      const availableCoupleTables = (restaurantData.Couple_table - coupleTablesBooked) + couplequantity; // Max available couple tables minus tables already booked and those requested
      const availableGroupTables = (restaurantData.Group_table - groupTablesBooked) + groupquantity; // Max available group tables minus tables already booked and those requested

      setAvailableTables({ couple: availableCoupleTables, group: availableGroupTables });
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching table availability.");
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const totalCoupleTablesRequested = parseInt(couplequantity);
    const totalGroupTablesRequested = parseInt(groupquantity);

    if (totalCoupleTablesRequested > availableTables.couple) {
      setError("The requested couple table count exceeds the available couple tables.");
      return;
    }

    if (totalGroupTablesRequested > availableTables.group) {
      setError("The requested group table count exceeds the available group tables.");
      return;
    }

    const booking = {
      id,
      name,
      date: selectedDateTime.date,
      couplequantity,
      groupquantity,
      time: selectedDateTime.time,
      telephoneno
    };

    try {
      const response = await axios.patch(`/api/realtimebooking/${id}`, booking);
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

    navigate("/dine-in-bookings");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/dine-in-form"} style={{ color: "white" }}>Dine In Form</Link>
          </Typography>
          <Button color="inherit" component={Link} to="/dine-in-bookings">
            Dine In
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/pre-booking-dine-in-form"
          >
            Pre Bookings
          </Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            component={Link}
            to="/menu"
          ></IconButton>
        </Toolbar>
      </AppBar>
    <form className="update" onSubmit={handleSubmit}>
      <h3>Update Booking</h3>

      <Paper sx={{ bgcolor: "white" }}>
        <Box sx={{ marginLeft: "60px", marginRight: "60px", marginTop: "40px", marginBottom: "40px", padding: "20px" }}>
          <h2>Dine In Details</h2>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                required
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="time"
                label="Time"
                type="time"
                value={selectedDateTime.time}
                onChange={(e) => setSelectedDateTime({ ...selectedDateTime, time: e.target.value })}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="date"
                label="Date"
                type="date"
                value={selectedDateTime.date}
                onChange={(e) => setSelectedDateTime({ ...selectedDateTime, date: e.target.value })}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="couplequantity"
                label="Couple Quantity"
                type="number"
                value={couplequantity}
                onChange={(e) => setCouplequantity(e.target.value)}
                sx={{ width: "100%" }}
                title={`Available couple tables: ${availableTables.couple}`}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="groupquantity"
                label="Group Quantity"
                type="number"
                value={groupquantity}
                onChange={(e) => setGroupquantity(e.target.value)}
                sx={{ width: "100%" }}
                title={`Available group tables: ${availableTables.group}`}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="telephoneno"
                label="Telephone No"
                type="text"
                value={telephoneno}
                onChange={(e) => setTelephoneNo(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Button variant="contained" color="primary" type="submit">
        Update Booking
      </Button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  );
};

export default UpdateDineInBooking;
