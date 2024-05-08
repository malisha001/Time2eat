import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TableCell,
  TableContainer,
  Paper,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const PrebookingDineInForm = () => {
  const { user } = useAuthContext();

  const [dineBookings, setDineBookings] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  console.log(user);
  useEffect(() => {
    const fetchDineInBookings = async () => {
      try {
        const response = await axios.get(`/api/booking/${user.resId}`);
        const data = response.data;
        setDineBookings(data);
      } catch (error) {
        console.error("Error fetching Dine In Bookings:", error);
      }
    };

    fetchDineInBookings();
  }, [user]);

  const handleClick = async (deleteDineBookings) => {
    try {
      await axios.delete(`/api/customerhistoryroute/${deleteDineBookings}`);
      setDineBookings((prevBookings) =>
        prevBookings.filter(
          (dineBooking) => dineBooking._id !== deleteDineBookings
        )
      );
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const filteredBookings = dineBookings
    ? dineBookings.filter((dineBooking) => {
        return (
          dineBooking.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dineBooking.date.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : [];

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to={"/dine-in-form"} style={{ color: "white" }}>Dine In Form</Link>
          </Typography>

          <Link to={"/dine-in-bookings"} style={{ color: "white" }}>
            <Button color="inherit">Dine In</Button>
          </Link>
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
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer
        component={Paper}
        style={{
          marginBottom: "20px",
          backgroundColor: "lightgrey",
          marginTop: "40px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: "lightblue" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Couple Tables</TableCell>
              <TableCell>Group Tables</TableCell>
              <TableCell>Telephone No</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((dineBooking) => (
              <TableRow key={dineBooking._id}>
                <TableCell>{dineBooking.name}</TableCell>
                <TableCell>{dineBooking.time}</TableCell>
                <TableCell>{dineBooking.date}</TableCell>
                <TableCell>{dineBooking.couplequantity}</TableCell>
                <TableCell>{dineBooking.groupquantity}</TableCell>
                <TableCell>{dineBooking.telephoneno}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleClick(dineBooking._id)}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PrebookingDineInForm;
