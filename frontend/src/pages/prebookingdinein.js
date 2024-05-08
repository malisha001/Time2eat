import React, { useState, useEffect } from "react";
import { Button, Grid, Paper } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";

function PrebookingDineInForm() {
  const [bookingIdInput, setBookingIdInput] = useState("");
  const [booking, setBooking] = useState(null);
  const [cusid, setcusID] = useState("");
  const [resid, setresID] = useState("");
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [couplequantity, setCouplequantity] = useState("");
  const [groupquantity, setGroupquantity] = useState("");
  const [telephoneno, setTelephone] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const response = await axios.get(`/api/booking/${bookingIdInput}`);
      setBooking(response.data);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching booking details.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const PreBookingDetails = {
      cusid,
      resid,
      name,
      time,
      date,
      couplequantity,
      groupquantity,
      telephoneno,
    };

    try {
      // Add booking details
      await axios.post("/api/realtimebooking", PreBookingDetails);

      // Add customer history route
      await axios.post("/api/customerhistoryroute", {
        ...PreBookingDetails,
        bookingId: booking.id, // Assuming `booking` contains the fetched booking data
      });

    //   // Delete the entry from the booking table
    //   await axios.delete(`/api/booking/${booking.id}`);

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

  const handleBookingIdInputChange = (e) => {
    setBookingIdInput(e.target.value);
  };

  const handleCheckBookingId = async () => {
    try {
      const response = await axios.get(`/api/booking/${bookingIdInput}`);
      const fetchedBooking = response.data;
      if (fetchedBooking) {
        setBooking(fetchedBooking);
        setcusID(fetchedBooking.cusid);
        setresID(fetchedBooking.resid);
        setName(fetchedBooking.name);
        setTime(fetchedBooking.time);
        setDate(fetchedBooking.date);
        setCouplequantity(fetchedBooking.couplequantity);
        setGroupquantity(fetchedBooking.groupquantity);
        setTelephone(fetchedBooking.telephoneno);
        setError(null);
      } else {
        setError("Entered booking ID does not match any existing booking.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching booking details.");
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Booking</h3>
      <Paper sx={{ bgcolor: "white" }}>
        <Box sx={{ marginLeft: "60px", marginRight: "60px", marginTop: "40px", marginBottom: "40px", padding: "20px" }}>
          <h2>Payment Details</h2>
          <TextField
            required
            id="booking-id"
            label="Booking ID"
            type="text"
            onChange={handleBookingIdInputChange}
            value={bookingIdInput}
            sx={{ width: "100%" }}
          />
          <Button onClick={handleCheckBookingId}>Check Booking ID</Button>
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
      <Button type="submit">Submit</Button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default PrebookingDineInForm;
