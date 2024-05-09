import classes from './dorderDetails.module.css';
import { useDorderContext} from '../../hooks/useDorderContext';
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const DIorderDetails = ({ order}) => {
  const { dispatch } =  useDorderContext()

    const handleClick = async () => {
      const response = await fetch('/api/dineinorders/' + order._id,{
        method: 'DELETE'
      })
       const json = await response.json()

       if (response.ok) {
        dispatch({type: 'DELETE_ORDER', payload: json})
  
      }
       
    }

    return (
        
        <div className={classes.dineindetails}>
          
           
            <p><strong>Table ID: </strong> {order.tableid}</p>
            <p><strong>Food Item: </strong> {order.fooditem}</p>
            <p><strong>Food Name: </strong> {order.name}</p>
            <p><strong>Quantity: </strong> {order.quantity}</p>
            <p><strong>Price: </strong> {order.price}</p>
            <p><strong>Order State: </strong> {order.state}</p>

            <p>{formatDistanceToNow(new Date(order.createdAt),{addSuffix: true })}</p>
            
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default DIorderDetails;