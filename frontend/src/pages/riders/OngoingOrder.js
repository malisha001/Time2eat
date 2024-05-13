import React, { useEffect,useState } from 'react';
import { TextField,Paper,Divider, Grid,Button,TableContainer,TableHead,Table,TableRow,TableCell,TableBody } from '@mui/material';
import { getOngoingOrder } from '../../services/api';
import Ridernav from '../../component/ridernav/Ridernav';
import { useAuthContext } from '../../hooks/useAuthContext';

function OngoingOrder() {
    const [ongoingOrderData, setOngoingOrderData] = useState([]);
    const { user } = useAuthContext(); //get user details

    useEffect(() => {  
        const fetchOngoingOrder = async () => {
            try {
                const ongoingOrderData = await getOngoingOrder(user.email);
                setOngoingOrderData(ongoingOrderData)
                console.log("orders",ongoingOrderData);
                // Call your API function to fetch ongoing order data
            } catch (error) {
                console.error('Error fetching ongoing order data:', error);
            }
        }
        fetchOngoingOrder();
    }, [user]);
    return (
        <div>
        <Ridernav/>
        <div className="Inv-dashborad">
        <h1>Ongoing Order</h1>
        <Divider style={{ marginBottom: '16px' }} />
        {ongoingOrderData.map((item) => (
            <Paper key={item._id} sx={{ padding: '32px', bgcolor: '#F0F8FF', margin: '20px' }}>
                <p>orderId: {item.orderId}</p>
                <p>customer name:{item.cusName}</p>
                <p>delivery address:{item.customerLocation}</p>
                <p>restaurent name:{item.restaurantname}</p>
                <p>restuarent location:{item.reslocation}</p>
                <p>order status:</p>
                <p>estimated time:</p>
                <TextField id="outlined-basic" label="Enter estimated time" variant="outlined" /><br/>
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
    </div>
    );
}

export default OngoingOrder;