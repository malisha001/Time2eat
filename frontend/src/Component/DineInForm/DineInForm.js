import classes from './dineinForm.module.css';
import { useState } from 'react';
import {  useDorderContext } from '../../hooks/useDorderContext';
import DIorderDetails from '../DorderDetails/DorderDetails';
const OrderForm = () => {

    const {dispatch} =  useDorderContext()

    const [resname,setResname] = useState('')
    const [restaurantid, setRestaurantid] = useState('')
    const [tableid, setTableid] = useState('')
    const [fooditem, setFooditem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [state , setState] = useState('')
    const [name, setName] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const order = { resname,restaurantid, tableid , fooditem , quantity, price,state,name}

        const response = await fetch('/api/dineinorders', {

            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Content-Type': 'application/json'
            }
        })

       // window.location.reload();

        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setResname('')
            setRestaurantid('')
            setTableid('')
            setFooditem('')
            setQuantity('')
            setPrice('')
            setState('')
            setName('')
            setError(null)
           setEmptyFields([])
            console.log('new order added', json)
            dispatch({type: 'CREATE_ORDER', payload: json})
        }
    }

    return(

     <div>

            {DIorderDetails}
        
     <form  className={classes.create} onSubmit={handleSubmit}>
        <h3>Add a New order </h3>
        <label>Restaurant Name:</label>
        <input 
            type="text"
            onChange={(e) => setResname(e.target.value)}
            value={resname}
            className={emptyFields.includes('title') ? 'error' : ''}
    />

        <label>Restaurant ID: </label>
        <input 
            type="String"
            onChange={(e) => setRestaurantid(e.target.value)}
            value={restaurantid}
            className={emptyFields.includes('title') ? 'error' : ''}
    />


        <label>Table ID: </label>
        <input 
            type="String"
            onChange={(e) => setTableid(e.target.value)}
            value={tableid}
            className={emptyFields.includes('title') ? 'error' : ''}
    />



        <label>Food Item: </label>
        <input 
            type="text"
            onChange={(e) => setFooditem(e.target.value)}
            value={fooditem}
            className={emptyFields.includes('title') ? 'error' : ''}
    />



        <label>Quantity: </label>
        <input 
            type="Number"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            className={emptyFields.includes('title') ? 'error' : ''}
    />



        <label>Price: </label>
        <input 
            type="Number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className={emptyFields.includes('title') ? 'error' : ''}
    />

        <label>Name: </label>
        <input 
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={emptyFields.includes('title') ? 'error' : ''}
    /> 

        <label>State: </label>
        <input 
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            className={emptyFields.includes('title') ? 'error' : ''}
    /> 
        {/*<select
        
        onChange={(e) => setState(e.target.value)}
        value={state}
        
        className={emptyFields.includes('title') ? 'error' : ''}
        >
    <option value="completed">Completed</option>
    <option value="processing">Processing</option>
    </select>*/}


         
        
     <button>Add order</button>
     {error && <div clasName={classes.error}>{error}</div>}
     </form>


     </div>   

    )
}

export default OrderForm;