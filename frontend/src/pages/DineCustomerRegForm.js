import React, { useState, useEffect } from "react";
import { Button, Grid, Paper, Typography, AppBar, Toolbar} from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import ResNavbar from '../component/restauretNavbar/ResNavbar';

function DineCustomerRegForm() {
  // Using custom hooks for authentication context and navigation
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // State variables for form fields, error messages, and available tables
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
    couple: 0,
    group: 0,
  });

  // Fetch booking data when user changes
  useEffect(() => {
    if (user) {
      fetchBookingData(user.resId);
    }
  }, [user]);

  // Function to fetch booking data
  const fetchBookingData = async (resId) => {
    try {
      // Fetch realtime bookings
      const bookingsResponse = await axios.get(`/api/realtimebooking/${resId}`);
      const bookingsData = bookingsResponse.data;

      // Fetch restaurant data
      const restaurantResponse = await axios.get(`/api/restaurants/${resId}`);
      const restaurantData = restaurantResponse.data;

      // Calculate available tables
      const coupleTablesBooked = bookingsData.reduce(
        (acc, booking) => acc + booking.couplequantity,
        0
      );
      const groupTablesBooked = bookingsData.reduce(
        (acc, booking) => acc + booking.groupquantity,
        0
      );

      // Log data for debugging
      console.log(restaurantData.Couple_table)
      console.log(restaurantData.Group_table)

      console.log(coupleTablesBooked)
      console.log(groupTablesBooked)

      // Calculate available tables
      const availableCoupleTables = restaurantData.Couple_table - coupleTablesBooked;
      const availableGroupTables = restaurantData.Group_table - groupTablesBooked;

      // Set available tables state
      setAvailableTables({ couple: availableCoupleTables, group: availableGroupTables });
    } catch (error) {
      // Log error and set error state
      console.error("Error fetching booking data:", error);
      setError("An error occurred while fetching booking data.");
    }
  };

  // Function to handle form submission
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
    const dineCustomerRegForm = { resid: user.resId, name, time, date, couplequantity, groupquantity, telephoneno };

    if (!nameError && !telError) {
      try {
        // Send booking data to server
        await axios.post("/api/realtimebooking", dineCustomerRegForm);
        await axios.post("/api/customerhistoryroute", dineCustomerRegForm);
        // Clear form fields after successful submission
        clearFormFields();
      } catch (error) {
        // Log error and set error state
        console.error("Error adding booking:", error);
        setError("An error occurred while adding the booking.");
      }
    } else {
      setError("Please enter valid details");
    }

    navigate("/dine-in-bookings")
  };

  // Function to clear form fields
  const clearFormFields = () => {
    setName("");
    setTime("");
    setDate("");
    setCouplequantity("");
    setGroupquantity("");
    setTelephone("");
    setError(null);
    setNameError(null);
    setTelError(null);
  };

  // Render form components
  return (
    <div>
      <ResNavbar/>
      <div className="Inv-dashborad">
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dine In Form
        </Typography>
        <Button color="inherit" component={Link} to="/dine-in-bookings">Dine In</Button>
        <Button color="inherit" component={Link} to="/pre-booking-dine-in-form">Pre Bookings</Button>
        <Button color="inherit" component={Link} to="/All-dine-in-booking-History">All Dine In Customer</Button>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          component={Link}
          to="/menu"
        >
         
        </IconButton>
      </Toolbar>
    </AppBar>
    
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Booking</h3>

      <Paper sx={{ bgcolor: "white", height: '400px', marginLeft: '20px', marginRight: '20px', backgroundColor: 'lightgray' }}>
        <Box sx={{ marginLeft: "60px", marginRight: "60px", marginTop: "40px", marginBottom: "40px", padding: "20px" }}>
          <h2>Dine In Booking Details</h2>
          <Grid container spacing={4}>
            {/* Name field */}
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Name"
                type="text"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/[^a-zA-Z\s]/.test(value)) {
                    setNameError('Please enter a valid name (letters and spaces only)');
                  } else {
                    setNameError('');
                    setName(value.replace(/[^a-zA-Z\s]/g, '')); // Remove numbers and special characters
                  }
                }}
                value={name}
                sx={{ width: "100%" }}
              />
              { nameError && (
                <Typography variant="body2" color="error">
                  {nameError}
                </Typography>
              )}
            </Grid>

            {/* Time field */}
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

            {/* Date field */}
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Date"
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                sx={{ width: "100%" }}
                // Set the minimum selectable date to today
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
              />
            </Grid>

            {/* Couple quantity field */}
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

            {/* Group quantity field */}
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

            {/* Telephone number field */}
            <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Telephone No"
              type="tel"
              onChange={(e) => {
                const value = e.target.value;
                if (/[^0-9]/.test(value)) {
                  setTelError('Please enter a valid telephone number (digits only)');
                } else {
                  setTelError('');
                  setTelephone(value.replace(/[^0-9]/g, '')); // Remove non-digits
                }
              }}
              value={telephoneno}
              sx={{ width: "100%" }}
            />
            { telError && (
              <Typography variant="body2" color="error">
                {telError}
              </Typography>
            )}
          </Grid>


          </Grid>
          {/* Button to submit the form */}
          <Button type="submit" contained sx={{ marginTop: '20px', backgroundColor: 'lightblue' }}>Add Booking</Button>
          {/* Display error message if any */}
          {error && <div className="error">{error}</div>}
        </Box>
      </Paper>
    </form>
    </div>
    </div>
  );
}

export default DineCustomerRegForm;
