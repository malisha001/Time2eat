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
    const [order, setOrder] = useState({});

    useEffect(() => {
        setOrder({ ...cart });
    }, [cart]);

    if (!user) {
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
