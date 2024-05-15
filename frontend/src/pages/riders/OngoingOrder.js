import React, { useEffect,useState } from 'react';
import { TextField,Paper,Divider, Grid,Button,TableContainer,TableHead,Table,TableRow,TableCell,TableBody } from '@mui/material';
import { getOngoingOrder,enterEstimateTime,markOrderComplete } from '../../services/api';
import Ridernav from '../../component/ridernav/Ridernav';
import { useAuthContext } from '../../hooks/useAuthContext';

function OngoingOrder() {
    const [ongoingOrderData, setOngoingOrderData] = useState([]);
    const [estimatedTime, setEstimatedTime] = useState(''); // State to store estimated time
    const[complete,setComplete] = useState('')
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

    // Function to handle order completion
    const handleCompleteOrder = async (orderId) => {
        console.log("orderid",orderId)
        try {
            await markOrderComplete(orderId,); // Mark order as complete in backend
            setComplete('complete'); // Update state to indicate completion
            // Optionally, you can refresh the page here
            window.location.reload();
        } catch (error) {
            console.error('Error completing order:', error);
        }
    }

    // Function to handle change in estimated time input
    const handleEstimatedTimeChange = (event) => {
        setEstimatedTime(event.target.value);
    }
     // Function to handle update button click
    const handleUpdateClick = async (orderId) => {
        try {
            const time = await enterEstimateTime(orderId, {
                estimatetime:estimatedTime,
            }); // Update estimated time
            window.location.reload();
        } catch (error) {
            console.error('Error updating estimated time:', error);
        }
    }

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
                <p>estimated time:{item.estimatetime}</p>
                <TextField id="outlined-basic" label="Enter estimated time" variant="outlined" value={estimatedTime} onChange={handleEstimatedTimeChange}/><br/>
                <Button variant='contained' onClick={() => handleUpdateClick(item._id)}> update</Button>
                <Button variant='contained' onClick={() => handleCompleteOrder(item._id)}> complete order</Button>
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