import classes from './dorderDetails.module.css';

const DIorderDetails = ({ order}) => {

    const handleClick = async () => {
      const response = await fetch('/api/dineinorders/' + order._id,{
        method: 'DELETE'
      })
       const json = await response.json()

       
    }

    return (
        
        <div className={classes.dineindetails}>
            <h4>{order.restaurantid}</h4>
            <p><strong>Table ID: </strong> {order.tableid}</p>
            <p><strong>Food Item: </strong> {order.fooditem}</p>
            <p><strong>Food Name: </strong> {order.name}</p>
            <p><strong>Quantity: </strong> {order.quantity}</p>
            <p><strong>Price (LKR): </strong> {order.price}</p>
            <p><strong>Order State: </strong> {order.state}</p>
            <p>{order.createdAt}</p>

            <span onClick={handleClick} >delete</span>
        </div>
    )
}

export default DIorderDetails;