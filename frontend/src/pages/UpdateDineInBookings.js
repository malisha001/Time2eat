import React, { useState, useEffect } from "react";
import { Grid, Paper, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateDineInBooking = () => {
  const { id } = useParams();
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

  useEffect(() => {
    fetchAvailableTables();
  }, [couplequantity, groupquantity]);

  const fetchAvailableTables = async () => {
    try {
      const response = await axios.get("/api/realtimebooking");
      const bookings = response.data;

      const coupleTablesBooked = bookings.reduce(
        (acc, booking) => acc + booking.couplequantity,
        0
      );
      const groupTablesBooked = bookings.reduce(
        (acc, booking) => acc + booking.groupquantity,
        0
      );

      const availableCoupleTables = (10 - coupleTablesBooked) + couplequantity; // Max available couple tables minus tables already booked and those requested
      const availableGroupTables = (15 - groupTablesBooked) + groupquantity; // Max available group tables minus tables already booked and those requested

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

    navigate("/");
  };

  return (
    <form className="update" onSubmit={handleSubmit}>
      <h3>Update Booking</h3>

      <Paper sx={{ bgcolor: "white" }}>
        <Box sx={{ marginLeft: "60px", marginRight: "60px", marginTop: "40px", marginBottom: "40px", padding: "20px" }}>
          <h2>Payment Details</h2>
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
  );
};

export default UpdateDineInBooking;
