import React, { useEffect, useState } from 'react';
import { fetchcompleteorders } from '../../services/api';
import { TextField, Paper, Divider, Grid, Button, TableContainer, TableHead, Table, TableRow, TableCell, TableBody } from '@mui/material';
import Ridernav from '../../component/ridernav/Ridernav';
import { useAuthContext } from '../../hooks/useAuthContext';

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

    return (
        <div>
            <Ridernav />
            <div className="Inv-dashborad">
                <h1>Order History</h1>
                <Divider style={{ marginBottom: '16px' }} />
                {/* Search Input */}
                <TextField
                    label="Search Restaurant"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginBottom: '16px' }}
                />
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
