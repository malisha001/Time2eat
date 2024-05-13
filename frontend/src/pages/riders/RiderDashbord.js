import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper,Button, Divider } from '@mui/material';
import { getDeliveryOrders,acceptOrder,showRider } from '../../services/api';
import {useNavigate,Route,Routes} from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Ridernav from '../../component/ridernav/Ridernav';
import Resuppernav from '../../component/restauretNavbar/Resuppernav';

//nested router
import OngoingOrder from './OngoingOrder';

function RiderDashboard() {
    const {user} = useAuthContext()
    const navigate = useNavigate()
    const [uniqueOrders, setUniqueOrders] = useState([]);

    console.log("rider",user)

    const handleOnclick = async(order)=>{
        console.log("orderId:",order)
        try {
            const orderres = await acceptOrder({
                orderId: order.orderid,
                riderId: user.email,
                cusName: order.cusId,
                customerLocation: order.customerLocation,
                restaurantname: order.restaurantname,
                reslocation: order.reslocation,
                price: order.price
            });

            //delete order from rider dashbord
            
            // res.status(200).json(orderres);
            navigate('/riderdashborad/ongoingorder')
        } catch (error) {
            console.error('Error accepting order:', error);
        }
        try {
            const riderupdate = await showRider(order.orderid,{
                riderSelected: true,
            });
            // res.status(200).json(riderupdate);
        } catch (eror) {
            
        }
        
    }

    useEffect(() => {
        const fetchAllDeliveries = async () => {
            try {
                const deliveryData = await getDeliveryOrders();
                console.log(deliveryData);
                // Filter out unique order IDs
                const uniqueOrderIds = [...new Set(deliveryData.map(item => item.orderid))];
                // Create an array of unique orders based on the order IDs
                const uniqueOrdersData = uniqueOrderIds.map(orderId => {
                    const orderDetails = deliveryData.find(item => item.orderid === orderId);
                    return orderDetails;
                });
                setUniqueOrders(uniqueOrdersData);
                console.log("uni",uniqueOrdersData);
            } catch (error) {
                console.error('Error fetching delivery orders:', error);
            }
        }

        fetchAllDeliveries();

    }, [user]);

    return (
        <div>
            <Ridernav/>
            <div className="Inv-dashborad">
            <h1>Rider Dashboard</h1>
            <Divider style={{ marginBottom: '16px' }} />
            
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Customer location</TableCell>
                            <TableCell>Restaurant Name</TableCell>
                            <TableCell>total price</TableCell>
                            
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uniqueOrders.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.orderid}</TableCell>
                                <TableCell>{item.cusId}</TableCell>
                                <TableCell>{item.customerLocation}</TableCell>
                                <TableCell>{item.restaurantname}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <Button variant='contained' onClick={()=>handleOnclick(item)}>accept</Button>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Routes>
                <Route path="riderdashborad/ongoingorder" element={<OngoingOrder/>} />
            </Routes>
            </div>
        </div>
    )
}

export default RiderDashboard;
