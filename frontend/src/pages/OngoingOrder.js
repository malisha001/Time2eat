import React, { useEffect,useState } from 'react';
import { Paper, Grid,Button,TableContainer,TableHead,Table,TableRow,TableCell,TableBody } from '@mui/material';
import { getOngoingOrder } from '../services/api';

function OngoingOrder() {
    const [ongoingOrderData, setOngoingOrderData] = useState([]);

    useEffect(() => {  
        const fetchOngoingOrder = async () => {
            try {
                const ongoingOrderData = await getOngoingOrder();
                setOngoingOrderData(ongoingOrderData)
                // Call your API function to fetch ongoing order data
            } catch (error) {
                console.error('Error fetching ongoing order data:', error);
            }
        }
        fetchOngoingOrder();
    }, []);
    return (
        <div>
        <h1>Ongoing Order</h1>
        {ongoingOrderData.map((item) => (
            <Paper key={item._id} sx={{ padding: '32px', bgcolor: '#F0F8FF', margin: '20px' }}>
                <p>orderId: {item.orderId}</p>
                <p>customer name:{item.cusName}</p>
                <p>delivery address:{item.customerLocation}</p>
                <p>restaurent name:{item.restaurantname}</p>
                <p>restuarent location:{item.reslocation}</p>
                <p>order status:</p>
                <p>estimated time:</p>
                <Button variant='contained'> update</Button>
            </Paper>
        ))}
            <div>
            <TableContainer component={Paper}>
            <Table  aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Employee ID</TableCell>
                    <TableCell>Restaurant ID</TableCell>
                    <TableCell>Basic Salary</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Bonus Rate</TableCell>
                    <TableCell>Tax Rate</TableCell>
                    <TableCell>action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                
                    <TableRow >
                    <TableCell>xxxx</TableCell>
                    <TableCell>xxxx</TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxx</TableCell>
                    <TableCell>xxxxxx</TableCell>
                    <TableCell>xxxx</TableCell>
                    <TableCell>delete</TableCell>
                    </TableRow>
                
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    </div>
    );
}

export default OngoingOrder;