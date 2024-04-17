import React from 'react';
import { useState, useEffect } from 'react';
import { Paper,Button,TextField,FormControl,FormLabel,RadioGroup,Radio,FormControlLabel } from '@mui/material';
import { getCartData,checkRider } from '../services/api';
import {useNavigate,Route,Routes} from 'react-router-dom';
import { placeorder } from '../services/api';
import Payment from './Payment';

function Cart() {
    //navigate another page
    const navigate = useNavigate()
    //state
    const [location, setLocation] = useState('');
    const [radiovalue, setRadioValue] = useState('');
    const [cartData, setCartData] = useState([]);
    const[isDataSent,setDataSent] = useState(false);
    const[message,setMessage] = useState('');
    const[countdown,setCountdown] = useState(10);

    //get radio button value
    const handleChange = (event) => {
        setRadioValue(event.target.value);     
    }
    //get textfield value
    const testfieldhandle = (event) => {
        setLocation(event.target.value)
    }
    //delivery handle function
    const handleDelivery = async(orderid) => {
        setDataSent(true)
        setMessage('Looking for your rider!')

        try {
            const find = await checkRider(orderid);
            console.log('find:',find);
            if (find.length > 0) {
                setMessage('Rider found! Order placed Successfully');
                navigate('/payment')
            }

        } catch (error) {
            console.error('Error finding rider:', error);
        }
    }

    //confirm order
    const handleClickConfirm = async(order,resname) => {
        handleDelivery(order);
        //if delivery is selected

        //start countdown
        const countdownId = setInterval(() => {
            setCountdown(countdown => countdown - 1);
        }, 1000);

        //if delivery is selected
        if(radiovalue === 'delivery'){
            const data = {
                orderid: order,
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
            }, 9000);

            // Stop triggering after 10 secs
            setTimeout(() => {
                clearInterval(intervalId);
                clearInterval(countdownId); // Stop the countdown
                setMessage('No riders available! Try Pickup')
                setDataSent(false)
            }, 100000); 

        }
        else{
            const data = {
                orderid: order,
                restaurantname: resname,
                deliveryOpt: radiovalue,
                riderSelected: false,
            }
            console.log('Order confirmed:', data);

            try {
                const response = await placeorder(data);
                console.log('data:',data);
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
                // Group items by order ID
                const ordersMap = new Map();
                fetchCartData.forEach(item => {
                    if (ordersMap.has(item.orderid)) {
                        ordersMap.get(item.orderid).items.push(item.fooditem);
                    } else {
                        ordersMap.set(item.orderid, { ...item, items: [item.fooditem] });
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
            <h1>Cart Page</h1>

            {radiovalue === 'delivery' && (
            <div>
                <p>{message}</p>
                <p>Wait {countdown} secs to find your Delivery Hero!</p>
            </div>
            )}

            <div>
                {cartData.map((order) => (
                    <Paper key={order.orderid} sx={{ padding: '32px', bgcolor: '#F0F8FF', margin: '20px' }}>
                        <h2>Restaurant name: {order.restaurantname}</h2>
                        <h3>Order Id: {order.orderid}</h3>
                        <h3>Items:</h3>
                        <ul>
                            {order.items.map((foodItem, index) => (
                                <li key={index}>{foodItem}</li>
                            ))}
                        </ul>
                        <TextField name="resId"  variant = "outlined" label = "location" value={location} onChange={testfieldhandle}
                            style={{ display: radiovalue === 'delivery' ? 'block' : 'none' }} // Show only if delivery is selected
                        /><br/>
                        <FormControl variant="outlined">
                            <FormLabel id="demo-radio-buttons-group-label">parcel option</FormLabel>
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
                        </FormControl><br/>
                        <Button variant='contained' onClick={()=>handleClickConfirm(order.orderid,order.restaurantname)} disabled ={isDataSent}> confirm</Button>
                        
                    </Paper>
                ))}
            </div>
        </div>
    );
}

export default Cart;
