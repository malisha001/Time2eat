import classes from './dineinForm.module.css';
import { useState } from 'react';
import {  useDorderContext } from '../../hooks/useDorderContext';
import DIorderDetails from '../DorderDetails/DorderDetails';
const OrderForm = () => {

    const {dispatch} =  useDorderContext()

   
    const [tableid, setTableid] = useState('')
    const [fooditem, setFooditem] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [state , setState] = useState('')
    const [name, setName] = useState('')
    const [error,setError] = useState(null)
    const [emptyFields,setEmptyFields] = useState([])
    const [itemNameError, setItemNameError] = useState(null);
    const [TableIdError,setTableIdError] = useState(null);
    const [StateError,setStateError] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault()

        const order = {  tableid , fooditem , quantity, price,state,name}

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
    
    const handleTableIdChange = (value) => {
        if (!/^[A-Z0-9]*$/.test(value)) { // Check if the value contains only capital letters and numbers
            setTableIdError('Table ID should only contain capital letters and numbers');
        } else {
            setTableid(value);
            setTableIdError('');
        }
    };
    
    

    const handleItemNameChange = (value) => {
        if (!/^[A-Za-z\s]*$/.test(value)) { // Check if the value contains only letters and spaces
            setItemNameError('Item Name should only contain letters and spaces');
        } else {
            
            setName(value);
            setItemNameError('');
        }
    };

    const handlestateChange = (value) => {
    if (!/^[A-Za-z\s]*$/.test(value)) { // Check if the value contains only letters and spaces
        setStateError('state should only contain letters');
    } else {
        
        setState(value);
        setStateError('');
        }
    };
    return(

     <div>

            {DIorderDetails}
        
     <form  className={classes.create} onSubmit={handleSubmit}>
        <h3>Add a New order </h3>
        
        
        <label>Table ID: </label>
        <input 
            type="text"
            onChange={(e) => handleTableIdChange(e.target.value)}
            value={tableid}
            className={emptyFields.includes('tableid') ? 'error' : ''}

            
    />
    



        <label>Food Item Number: </label>
        <input 
            type="Number"
            onChange={(e) => setFooditem(e.target.value)}
            value={fooditem}
            className={emptyFields.includes('fooditem') ? 'error' : ''}
    />



        <label>Quantity: </label>
        <input 
            type="Number"
            onChange={(e) => setQuantity(e.target.value)}
            value={quantity}
            className={emptyFields.includes('quantity') ? 'error' : ''}
    />



        <label>Price: </label>
        <input 
            type="Number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className={emptyFields.includes('price') ? 'error' : ''}
    />

        <label>Name: </label>
        <input 
            type="text"
            onChange={(e) => handleItemNameChange(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''}
            
    /> 
        

        <label>State: </label>
        <input 
            type="text"
            onChange={(e) => handlestateChange (e.target.value)}
            value={state}
            className={emptyFields.includes('state') ? 'error' : ''}
    /> 
        
        
    
    
      
         
        
     <button>Add order</button>
     {error && <div clasName={classes.error}>{error}</div>}
     </form>


     </div>   

    )
}

export default OrderForm;