import React,{ useState } from "react";
import {useNavigate} from "react-router-dom";
import './addItem.css'

const ItemForm = () => {

    const [itemId, setitemId] = useState('')
    const [itemName, setItemName] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    const [itemCategory, setItemCategory] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()


        const inventoryItem = {itemId, itemName, itemQuantity, itemPrice, itemCategory}
        const response = await fetch('/api/inventory/', {
            method: 'POST',
            body: JSON.stringify(inventoryItem),
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setitemId('')
            setItemName('')
            setItemQuantity('')
            setItemPrice('')
            setItemCategory('')
            setError(null)
            console.log('new item added', json)
            navigate("/inventory/items/");

        }

    }

    return(

        <div className="addFood">
            <h1>Welcome to TIME<strong>2eat</strong> Inventory</h1>
            <hr />
            <h4>Please add new items here,</h4>

        <form className="create" onSubmit={handleSubmit}>

        
            <div className="input-image">
                <div className="firstIn">
                    <label>Item ID :</label>
                    <input 
                    type="Number" onChange={(e) => setitemId(e.target.value)} value={itemId}
                    />
                    
                    <label>Item Name :</label>
                    <input 
                    type="text" onChange={(e) => setItemName(e.target.value)} value={itemName}
                    />

                    <label>Item Quantity : </label>
                    <input 
                    type="Number" onChange={(e) => setItemQuantity(e.target.value)} value={itemQuantity}
                    />
                </div>
                    <img src="/Popular-foods.jpg" alt="" />

            </div>

            <div className="inputTwo">
                <div className="input-container">
                    <label>Item Price:</label>
                    <input type="Number" onChange={(e) => setItemPrice(e.target.value)} value={itemPrice} />
                </div>
                
                <div className="input-container">
                    <label>Item Category:</label>
                    <input type="text" onChange={(e) => setItemCategory(e.target.value)} value={itemCategory} />
                </div>
            </div>

            
            <br />
            <button>Save Item</button>
            {error && <div className="error">{error}</div>}

        </form>

    </div>

    )

}


export default ItemForm;