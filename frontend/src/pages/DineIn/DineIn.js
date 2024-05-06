import { useEffect} from 'react';
import classes from './dinein.module.css';
import { useDorderContext } from '../../hooks/useDorderContext';
import DIorderDetails from '../../component/DorderDetails/DorderDetails.js';
import OrderForm from '../../component/DineInForm/DineInForm';

const DineIn = () => {
  const {orders,dispatch}= useDorderContext()

    useEffect(() => {

         const fetchDineinOrders = async () => {
        
           const response = await fetch('/api/dineinorders');
           const json = await response.json();
          
          if(response.ok) {
            dispatch({type: 'SET_ORDERS' , payload: json})
           }
          }
       fetchDineinOrders()
    }, [dispatch])
  
  
    return (
     <div className={classes.topic}>
       <h2>Dine-In Orders</h2>
       
      <div className={classes.home}>
      <div className={classes.dinein} >
        <div className={classes.dorders}>
        {orders && orders.map((order) => (
            <DIorderDetails key={order._id} order={order} />
       ))}

      </div> 
      </div>

      


        <OrderForm />
       

        </div>
        </div>
        
    )
}

export default DineIn;