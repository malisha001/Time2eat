import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";

function DineCustomerRegForm() {

  const {user} = useAuthContext()
  const navigate = useNavigate();
  const [cusid, setcusID] = useState("");
  const [resid, setresID] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [couplequantity, setCouplequantity] = useState("");
  const [groupquantity, setGroupquantity] = useState("");
  const [telephoneno, setTelephone] = useState("");
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [telError, setTelError] = useState(null);
  const [availableTables, setAvailableTables] = useState({
    couple: 10,
    group: 15,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("/api/realtimebooking");
      const bookings = response.data;

      // Calculate total booked tables
      const coupleTablesBooked = bookings.reduce(
        (acc, booking) => acc + booking.couplequantity,
        0
      );
      const groupTablesBooked = bookings.reduce(
        (acc, booking) => acc + booking.groupquantity,
        0
      );

      // Calculate available tables
      const availableCoupleTables = 10 - coupleTablesBooked;
      const availableGroupTables = 15 - groupTablesBooked;

      setAvailableTables({ couple: availableCoupleTables, group: availableGroupTables });
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching table availability.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert input quantities to numbers
    const totalCoupleTablesRequested = parseInt(couplequantity);
    const totalGroupTablesRequested = parseInt(groupquantity);

    // Check if the requested tables exceed the available tables
    if (totalCoupleTablesRequested > availableTables.couple) {
      setError("The requested couple table count exceeds the available couple tables.");
      return;
    }

    if (totalGroupTablesRequested > availableTables.group) {
      setError("The requested group table count exceeds the available group tables.");
      return;
    }

    // Proceed with booking if everything is valid
    const DineCustomerRegForm = { cusid, resid, name, time, date, couplequantity, groupquantity, telephoneno };

    if(!nameError && !telError){ 
      try {
        await axios.post("/api/realtimebooking", DineCustomerRegForm);
        await axios.post("/api/customerhistoryroute", DineCustomerRegForm);
        clearFormFields();
      } catch (error) {
        console.error("Error adding booking:", error);
        setError("An error occurred while adding the booking.");
      }
    }
    else{
      setError("Please enter valid details");
    }
  };

  const clearFormFields = () => {
    setcusID("");
    setresID("");
    setName("");
    setTime("");
    setDate("");
    setCouplequantity("");
    setGroupquantity("");
    setTelephone("");
    setError(null);
    setNameError(null);
  };

  const handlePreBookingsClick = () => {
    navigate("/pre-booking-dine-in-form");
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Booking</h3>

      <Paper sx={{ bgcolor: "white", height: '400px', marginLeft: '20px', marginRight: '20px', backgroundColor: 'lightgray' }}>
        <Box sx={{ marginLeft: "60px", marginRight: "60px", marginTop: "40px", marginBottom: "40px", padding: "20px" }}>
          <h2>Payment Details</h2>
          <Grid container spacing={4}>

            <Grid item xs={6}>
              
            <TextField
              required
              id="outlined-required"
              label="Name"
              type="text"
              onChange={(e) => {
                const value = e.target.value;
                if (!/^[a-zA-Z]*$/.test(value)) {
                  setNameError('Please enter a valid name (letters only)');
                } else {
                  setNameError('');
                }
                setName(value);
              }}
              value={name}
              sx={{ width: "100%" }}
            />{nameError && (
                <Typography variant="body2" color="error">
                  {nameError}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
          <TextField
                required
                id="outlined-required"
                label="Time"
                type="time"
                onChange={(e) => setTime(e.target.value)}
                value={time}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Date"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="CoupleQuantity"
                type="number"
                onChange={(e) => setCouplequantity(e.target.value)}
                value={couplequantity}
                sx={{ width: "100%" }}
                title={`Available couple tables: ${availableTables.couple}`}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Groupquantity"
                type="number"
                onChange={(e) => setGroupquantity(e.target.value)}
                value={groupquantity}
                sx={{ width: "100%" }}
                title={`Available group tables: ${availableTables.group}`}
              />
            </Grid>
            <Grid item xs={6}>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Telephone No"
                type="tel"
                onChange={(e) => {
                  const value = e.target.value;
                  if (!/^\d{10}$/.test(value)) {
                    setTelError('Please enter a valid telephone number (10 digits)');
                  } else {
                    setTelError('');
                  }
                  setTelephone(value);
                }}
                value={telephoneno}
                sx={{ width: "100%" }}
              />
              {telError && (
                <Typography variant="body2" color="error">
                  {telError}
                </Typography>
              )}
            </Grid>

            </Grid>
          </Grid>
          <Button onClick={handlePreBookingsClick}>Pre Bookings</Button>
          <Button type="submit" contained sx={{marginTop: '20px', backgroundColor: 'lightblue'}}>Add Booking</Button>
          {error && <div className="error">{error}</div>}
        </Box>
      </Paper>

      
    </form>
  );
}

export default DineCustomerRegForm;