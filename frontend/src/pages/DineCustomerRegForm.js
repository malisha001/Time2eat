import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DineCustomerRegForm() {
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

    try {
      await axios.post("/api/realtimebooking", DineCustomerRegForm);
      await axios.post("/api/customerhistoryroute", DineCustomerRegForm);
      clearFormFields();
    } catch (error) {
      console.error("Error adding booking:", error);
      setError("An error occurred while adding the booking.");
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
  };

  const handlePreBookingsClick = () => {
    navigate("/pre-booking-dine-in-form");
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Booking</h3>

    
      <Paper sx={{ bgcolor: "white" }}>
        <Box sx={{ marginLeft: "60px", marginRight: "60px", marginTop: "40px", marginBottom: "40px", padding: "20px" }}>
          <h2>Payment Details</h2>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="CusID"
                type="text"
                onChange={(e) => setcusID(e.target.value)}
                value={cusid}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="ResID"
                type="text"
                onChange={(e) => setresID(e.target.value)}
                value={resid}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                sx={{ width: "100%" }}
              />
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
              <TextField
                required
                id="outlined-required"
                label="Telephone No"
                type="text"
                onChange={(e) => setTelephone(e.target.value)}
                value={telephoneno}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Button onClick={handlePreBookingsClick}>Pre Bookings</Button>
      <button>Add Booking</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default DineCustomerRegForm;