import { useCart } from '../../hooks/useCart.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useSignup } from '../../hooks/useSignup.js';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { createOrder } from '../../services/orderService.js';
import  classes from './checkout.module.css';
import Title from '../../component/Title/Title.js';
import Input from '../../component/Input/Input.js';
import Button from '../../component/Button/Button.js';
import OrderItemsList from '../../component/OrderItemsList/OrderItemsList.js';

export default function CheckoutPage() {

    const { cart } = useCart();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [order, setOrder] = useState({...cart });  //order has all the items of the cart(put a shallow copy of the cart inside the order)
    const{signup, setSignup} = useSignup();
   
   /* const {                                           //create a form for getting the data from the user
        signup,
        formState: { errors},
        handleSubmit,
    } = useForm();


    /* const submit = async data => {
       if (!order.addressLatLng) {                                                    //check if the user didn't select the address on the map
            toast.warning('please select your location on the map');                  //if user didn't select location
            return ;
        }


       await createOrder({ ...order, name: data.name, address: data.address });  // user selected location
        navigate ('/payment');
     }; */
     if (!user) {
        // Handle the case where user is null
        // For example, return a loading indicator or redirect to login page
        return <div>Loading...</div>;
    }
    
     
   return (
    <>
    <form  className={classes.container}> 
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
               value={user.fullName}
               label="Name"
               onChange={(e) => setSignup({  fullName: e.target.value })}
           />
            
            <Input
               value={user.address}
               label="Address"
               onChange={(e) => setSignup({  address: e.target.value })}
            />
            </div> 
        <OrderItemsList order={order} /> 
        </div>
        
      

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
          <Button
              type="submit"
              text="Go To Payment"
              width="100%"
              height="3rem"
            />
          </div>
          </div>
      </form>   
    
 </>              

);
  
}
