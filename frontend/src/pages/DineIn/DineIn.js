import { useEffect, useState} from 'react';
import classes from './dinein.module.css';
import DIorderDetails from '../../component/DorderDetails/DorderDetails.js';
import OrderForm from '../../component/DineInForm/DineInForm';
const DineIn = () => {
  const [orders,setOrders] = useState(null)

    useEffect(() => {

         const fetchDineinOrders = async () => {
           const response = await fetch('/api/dineinorders')
           const json = await response.json()

           if(response.ok) {
              setOrders(json)
           }
         }

         fetchDineinOrders()
    }, [])
    return (
      <div className={classes.home}>
        <div className={classes.dinein} >
        <div className={classes.dorders}>
             { orders && orders.map((order) => (
               <DIorderDetails key={order._id} order = {order} />
             ))}

        </div>

        <OrderForm />
       

        </div>
        </div>
        
    )
}

export default DineIn;