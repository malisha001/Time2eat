import { useEffect, useState } from "react";
import { Table, TableBody, TableHead,AppBar,Toolbar,Typography,IconButton, TableRow, TableCell, TableContainer, Paper, Button, TextField } from '@mui/material';
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../Assests/white.jpg';



const AllCustomerDineInHistory = () => {
    const { user } = useAuthContext();

    const [dineBookings, setDineBookings] = useState(null);
        const [searchTerm, setSearchTerm] = useState('');

        const generatePDFReport = () => {
            if (!dineBookings) return; // No data to generate report
            const doc = new jsPDF();
          
            
            const logoWidth = 30;
            const logoHeight = 30;
            const businessNameX = 10 + logoWidth + 10;
            
          
            // Add logo to the PDF document
            doc.addImage(logo, 'jpg', 10, 5,logoWidth,logoHeight);
            doc.setFontSize(16);
            doc.text("Restaurant Reservation and Food Ordering System", businessNameX , 20);
          
            // Add horizontal line
            doc.setLineWidth(0.5);
            doc.line(10, 30, doc.internal.pageSize.getWidth() - 10, 30);
          
            // Add "Dine-In Orders Daily Report" text
            const reportTitle = 'All Dine In Customer';
            const titleX = 70;
            
            doc.setFontSize(14);
            doc.text(reportTitle, titleX, 40); // Center the text horizontally
          
          
            const tableColumn = ["Customer Name", "Time", "Date", "Couple Quantity", "Group Quantity", "Telephone"];
            const tableRows = [];
             
            dineBookings.forEach((dineBooking) => {
              const rowData = [
                dineBooking.name,
                dineBooking.time,
                dineBooking.date,
                dineBooking.couplequantity,
                dineBooking.groupquantity,
                dineBooking.telephoneno,
                new Date(dineBooking.createdAt).toLocaleString()
              ];
              tableRows.push(rowData);
            });
          
            doc.autoTable({
              head: [tableColumn],
              body: tableRows,
              startY: 50
            });
          
            doc.save("dine_in_orders_report.pdf");
          };
          

    console.log(user)
    useEffect(() => {
        const fetchDineInBookings = async () => {
            try {
                const response = await axios.get(`/api/customerhistoryroute/${user.resId}`);
                const data = response.data;
                setDineBookings(data);
            } catch (error) {
                console.error('Error fetching Dine In Bookings:', error);
            }
        };

        fetchDineInBookings();
    }, [user]);

    const handleClick = async (deleteDineBookings) => {
        try {
            await axios.delete(`/api/customerhistoryroute/${deleteDineBookings}`);
            setDineBookings(prevBookings => prevBookings.filter(dineBooking => dineBooking._id !== deleteDineBookings));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    }

    const filteredBookings = dineBookings ? dineBookings.filter(dineBooking => {
        return (
            dineBooking.time.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dineBooking.date.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }) : [];

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
            <TextField 
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper} style={{ marginBottom: '20px', backgroundColor: 'lightgrey', marginTop: '40px' }}>
                <Table aria-label="simple table">
                    <TableHead sx={{bgcolor: 'lightblue'}}>
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
                                    <Button onClick={() => handleClick(dineBooking._id)} variant='contained'>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <button  onClick={generatePDFReport}>Generate PDF Report</button>

        </div>
    );
}

export default AllCustomerDineInHistory;
