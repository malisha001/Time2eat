import classes from './dineinForm.module.css';
import { useState } from 'react';
import DIorderDetails from '../DorderDetails/DorderDetails';
const OrderForm = () => {

    const [restaurantid, setRestaurantid] = useState('')
    const [tableid, setTableid] = useState('')
    const [fooditem, setFooditem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [state , setState] = useState('')
    const [name, setName] = useState('')
    const [error,setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const order = { restaurantid, tableid , fooditem , quantity, price,state,name}

        const response = await fetch('/api/dineinorders', {

            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        window.location.reload();

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setRestaurantid('')
            setTableid('')
            setFooditem('')
            setQuantity('')
            setPrice('')
            setState('')
            setName('')
            setError(null)
            console.log('new order added', json)
        }
    }

    return(

        <div>

            {DIorderDetails}
        
     <form  className={classes.create} onSubmit={handleSubmit}>
        <h3>Add a New order </h3>

        <label>Restaurant ID: </label>
        <input 
            type="String"
            onChange={(e) => setRestaurantid(e.target.value)}
            value={restaurantid}
    />


        <label>Table ID: </label>
        <input 
            type="String"
            onChange={(e) => setTableid(e.target.value)}
            value={tableid}
    />



        <label>Food Item: </label>
        <input 
            type="text"
            onChange={(e) => setFooditem(e.target.value)}
            value={fooditem}
    />



        <label>Quantity: </label>
        <input 
            type="Number"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
    />



        <label>Price: </label>
        <input 
            type="Number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
    />



        <label>State: </label>
        <input 
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
    />


         <label>Name: </label>
        <input 
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
    />
     <button>Add order</button>
     {error && <div clasName={classes.error}>{error}</div>}
     </form>


     </div>

    )
}

export default OrderForm;