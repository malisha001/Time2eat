import { Link } from "react-router-dom"

const inventoryItemsDetails = ({item}) => {

    


    const handleClick = async() => {
        const response = await fetch('/api/inventory/' + item._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        window.location.reload()
    }



    return (
        <div className="itemsDetails">
            <h4>{item.itemName}</h4>
            <p><strong>Item Quantity : </strong>{item.itemQuantity}</p>
            <p><strong>Item Price : Rs.</strong>{item.itemPrice}</p>
            <p><strong>Item Category : </strong>{item.itemCategory}</p>
            <button onClick={ handleClick }>Delete</button>
            <Link to={`/inventory/update/${item._id}`}>Update</Link>

        </div>
    )
} 

export default inventoryItemsDetails