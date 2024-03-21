const inventoryItemsDetails = ({item}) => {

    return (
        <div className="itemsDetails">
            <h4>{item.itemName}</h4>
            <p><strong>Item Quantity : </strong>{item.itemQuantity}</p>
            <p><strong>Item Price : Rs.</strong>{item.itemPrice}</p>
            <p><strong>Item Category : </strong>{item.itemCategory}</p>
            <p><strong>Item Image : </strong>{item.itemImage}</p>
            
        </div>
    )
} 

export default inventoryItemsDetails