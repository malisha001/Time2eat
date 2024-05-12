import { useCart } from '../../hooks/useCart.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createOrder } from '../../services/orderService.js';
import classes from './checkout.module.css';
import Title from '../../component/Title/Title.js';
import Button from '../../component/Button/Button.js';
import OrderItemsList from '../../component/OrderItemsList/OrderItemsList.js';

export default function CheckoutPage() {
    const { cart } = useCart();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [order, setOrder] = useState(''); //order has all the items of the cart(put a shallow copy of the cart inside the order)
    console.log("order",order)
   
   /* const {                                           //create a form for getting the data from the user
        signup,
        formState: { errors},
        handleSubmit,
    } = useForm(); */

    useEffect(() => {
        setOrder({ ...cart });
    }, [cart]);

     const submit = async data => {
      /* if (!order.addressLatLng) {                                                    //check if the user didn't select the address on the map
            toast.warning('please select your location on the map');                  //if user didn't select location
            return ;
        } */


       await createOrder({ ...order, fullname: data.fullname, address: data.address });  // user selected location
        navigate ('/payment');
     }; 
     if (!user) {
        // Handle the case where user is null
        // For example, return a loading indicator or redirect to login page
        return <div>Loading...</div>;
    }

    const handleCheckout = async () => {
        console.log('Order:', order);
        try {
            for (const item of order.items) {
              const cusId = user.email;
              const tprice = order.price;
              const foodname = item.food.name;
              const restaurantid = item.food.restaurantId;
              const orderid = restaurantid+user.email;
              
              const orderDetails = {
                tprice: order.totalPrice,
                foodname: item.food.name,
                restaurantid: item.food.restaurantId,
                orderid: item.food.restaurantId + user.email,
                cusId: user.email,
                cusname: user.name,
            };
            console.log('Order details:', orderDetails);
  
  
                const response = await fetch('/api/carts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderDetails),
                }
              );
  
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
  
                const data = await response.json();
                console.log('Order item saved:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        navigate('/carts');
    };

    return (
        <>
            <form className={classes.container}> 
                <div className={classes.content}>
                    <Title title="Order Form" fontSize="1.6rem" />
                    <div className={classes.inputs}>
                        <p>name: {user && user.name}</p>
                        <p>email: {user && user.email}</p>
                    </div> 
                    {order.items && <OrderItemsList order={order} />} {/* Conditionally render OrderItemsList */}
                </div>
                <div className={classes.buttons_container}>
                    <div className={classes.buttons}>
                        <Button
                            type="button"
                            text="Go To Payment"
                            width="100%"
                            height="3rem"
                            onClick={handleCheckout}
                        />
                    </div>
                </div>
            </form>
        </>
    );
}
