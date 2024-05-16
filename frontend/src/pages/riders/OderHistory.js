import React, { useEffect, useState } from 'react';
import { fetchcompleteorders } from '../../services/api';
import { TextField, Paper, Divider, Grid, Button, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material';
import Ridernav from '../../component/ridernav/Ridernav';
import { useAuthContext } from '../../hooks/useAuthContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../Assests/white.jpg';

function OrderHistory() {
    const { user } = useAuthContext();
    const [orderhistory, setOrderhistory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const completeorders = async () => {
            try {
                const res = await fetchcompleteorders(user.email);
                setOrderhistory(res);
                console.log("orders", res);
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        }
        completeorders();
    }, [user]);

    // Function to filter order history based on search term
    const filteredOrders = orderhistory.filter(item =>
        item.restaurantname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to generate PDF report
    const generatePDF = () => {
        const doc = new jsPDF();

        // Add image/logo
        doc.addImage(logo, 'JPEG', 10, 5, 30, 30);
        doc.setFontSize(16)
        doc.text('Restaurant Reservation and Food Ordering System', 50, 20); // Add a title to the PDF (optional	)

        //add hirizontal line
        doc.setLineWidth(0.5);
        doc.line(10, 30, doc.internal.pageSize.getWidth() - 10, 30);

        // Add title
        doc.setFontSize(20);
        doc.text('Order History Report', 70, 40);

        // Add table
        doc.autoTable({
            head: [['Order ID', 'Restaurant Name', 'Customer Name', 'Order Price', 'Delivery Fee']],
            body: filteredOrders.map(item => [item.orderId, item.restaurantname, item.cusName, `Rs.${item.price}`, 'Rs.100']),
            startY: 50,
        });

        // Save the PDF
        doc.save('order_history_report.pdf');
    };

    return (
        <div>
            <Ridernav />
            <div className="Inv-dashborad">
                <h1>Order History</h1>
                <Divider style={{ marginBottom: '16px' }} />
                {/* Search Input */}

                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                            <TextField
                                label="Search Restaurant"
                                variant="outlined"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ marginBottom: '16px' }}
                                fullWidth
                            />
                            </Grid>

                            <Grid item xs={3} >
                                 <Button variant="contained"  onClick={generatePDF} style={{ backgroundColor: '#8B0000' }}>Generate PDF</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Restaurant Name</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Order Price</TableCell>
                                <TableCell>Delivery Fee</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredOrders.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.orderId}</TableCell>
                                    <TableCell>{item.restaurantname}</TableCell>
                                    <TableCell>{item.cusName}</TableCell>
                                    <TableCell>Rs.{item.price}</TableCell>
                                    <TableCell>Rs.100</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default OrderHistory;
