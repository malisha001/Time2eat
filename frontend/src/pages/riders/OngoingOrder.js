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
            // Optionally, you can fetch updated ongoing order data here
            // and update the state if needed
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
                <p>OrderId: <strong> {item.orderId} </strong> </p>
                <p>Customer name: <strong> {item.cusName} </strong> </p>
                <p>Delivery address: <strong>{item.customerLocation} </strong> </p>
                <p>Restaurent name: <strong> {item.restaurantname} </strong> </p>
                <p>Estimated time: <strong>{item.estimatetime} </strong> </p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <TextField id="outlined-basic" label="Enter estimated time" variant="outlined" value={estimatedTime} onChange={handleEstimatedTimeChange} style={{ marginRight: '10px' }}/><br/>
                <div>
                <Button variant='contained' onClick={() => handleUpdateClick(item.orderId)} style={{ marginRight: '10px' }}> Update Time</Button>
                <Button variant='contained' onClick={() => handleCompleteOrder(item.orderId)} > Complete Order</Button>
                </div>
                </div>
            </Paper>
        ))}
            
    </div>
    </div>
    );
}

export default OngoingOrder;