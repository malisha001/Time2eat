import React, { useState, useEffect } from 'react';
import { Paper, Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { getCartData, checkRider } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { placeorder } from '../services/api';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../component/Navbar';

function Cart() {
    const { user } = useAuthContext(); //get user details
    //navigate another page
    const navigate = useNavigate();
    //state
    const [location, setLocation] = useState('');
    const [radiovalue, setRadioValue] = useState('');
    const [cartData, setCartData] = useState([]);
    const [isDataSent, setDataSent] = useState(false);
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(10);
    const [error, setError] = useState('');

    //get radio button value
    const handleChange = (event) => {
        setRadioValue(event.target.value);
    }

    //delivery handle function
    const handleDelivery = async (orderid) => {
        setDataSent(true)
        setMessage('Looking for a rider!')

        try {
            const find = await checkRider(orderid);
            console.log('find:', find);
            if (find.length > 0) {
                setMessage('Rider Found! Order placed successfully');
                navigate('/payment')
            }

        } catch (error) {
            console.error('Error finding rider:', error);
        }
    }

    //confirm order
    const handleClickConfirm = async (order, resname) => {
        handleDelivery(order);
        //if delivery is selected

        //start countdown
        const countdownId = setInterval(() => {
            setCountdown(countdown => countdown - 1);
        }, 1000);

        //if delivery is selected
        if (radiovalue === 'delivery') {
            const data = {
                orderid: order,
                cusName: user.email,
                customerLocation: location,
                restaurantname: resname,
                deliveryOpt: radiovalue,
                riderSelected: false,
            }
            console.log('Order confirmed:', data);

            try {
                const response = await placeorder(data);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                //if response is ok call handleDelivery function

            } catch (error) {
                console.error('Error placing order:', error);
            }

            // Trigger handleDelivery every 9 seconds
            const intervalId = setInterval(() => {
                handleDelivery(order); // Pass orderid or any other data you need
            }, 3000);

            // Stop triggering after 2 minutes
            setTimeout(() => {
                clearInterval(intervalId);
                clearInterval(countdownId); // Stop the countdown
                setMessage('No rider available in your area!')
                setDataSent(false)
            }, 10000); // 10 secs in milliseconds for now

        }
        else {
            const data = {
                orderid: order,
                restaurantname: resname,
                deliveryOpt: radiovalue,
                riderSelected: false,
            }
            console.log('Order confirmed:', data);

            try {
                const response = await placeorder(data);
                console.log('data:', data);
            } catch (error) {
                console.error('Error placing order:', error);
            }
            console.log('navigate to payment page:');
        }

    }

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const fetchCartData = await getCartData();
                console.log("fetch data:", fetchCartData)
                // Group items by order ID
                const ordersMap = new Map();
                fetchCartData.forEach(item => {
                    if (ordersMap.has(item.orderid)) {
                        ordersMap.get(item.orderid).items.push(item.foodname);
                    } else {
                        ordersMap.set(item.orderid, { ...item, items: [item.foodname] });
                    }
                });
                // Convert map values to array
                const uniqueOrdersData = Array.from(ordersMap.values());
                setCartData(uniqueOrdersData);

            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        }
        fetchCartData();

    }, []);

    return (
        <div>
            <Navbar />
            <h1>My order</h1>
            {radiovalue === 'delivery' && (
                <div>
                    <p>{message}</p>
                    <p>Wait {countdown} seconds to find a rider!</p>
                </div>
            )}
            
            <div>
                {cartData.map((order) => (
                    <Paper key={order.orderid} sx={{ padding: '32px', bgcolor: '#F0F8FF', margin: '20px' }}>
                        <Grid container >
                            <Grid item ={6}>
                                <h2>Restaurant name: {order.restaurantname}</h2>
                                <h3>Order Id: {order.orderid}</h3>
                                <h3>Items:</h3>
                                <ul>
                                    {order.items.map((foodname, index) => (
                                        <li key={index}>{foodname}</li>
                                    ))}
                                </ul>
                                <TextField
                                    name="resId"
                                    variant="outlined"
                                    label="Location"
                                    // value={location}
                                    // onChange={testfieldhandle}
                                    // error={Boolean(error)}
                                    // helperText={error}
                                    style={{ display: radiovalue === 'delivery' ? 'block' : 'none' }}
                                /><br />
                                <FormControl variant="outlined">
                                    <FormLabel id="demo-radio-buttons-group-label">Options</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="delivery"
                                        name="radio-buttons-group"
                                        value={radiovalue}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="pickup" control={<Radio />} label="pickup" />
                                        <FormControlLabel value="delivery" control={<Radio />} label="delivery" />
                                    </RadioGroup>
                                </FormControl><br />
                                <Button variant='contained' onClick={() => handleClickConfirm(order.orderid, order.restaurantname)} disabled={isDataSent}> confirm</Button>
                            </Grid>
                            <Grid item ={6} >
                                <h3>Price: {order.tprice}</h3>
                            </Grid>
                        </Grid>
                    </Paper>
                ))}
            </div>
        </div>

                    //get textfield value
    // const testfieldhandle = (event) => {
    //     const value = event.target.value;
    //     setLocation(value);
    //     // Validate the input
    //     if (!isValidLocation(value)) {
    //         // If input is invalid, set an error message
    //         setError('Enter valid Location');
    //     } else {
    //         // If input is valid, clear the error message
    //         setError('');
    //     }
    // }

    // const isValidLocation = (value) => {
    //     // allow only letters, numbers, and /
    //     const regex = /^[a-zA-Z0-9/]+$/;
    //     return regex.test(value);
    // };


    );
}

export default Cart;
