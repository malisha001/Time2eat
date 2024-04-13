import React from "react";

const UsageItemDetails = ({ item, setInitialQuantity, setNewQuantity }) => {

    const {_id } = item;

    
    

    return (
        <div className="usage-items">
            <ul>
                <li><h4>{item.itemName}</h4></li>
                <li>
                        <input type="Number" onChange={(e) => setInitialQuantity(_id, e.target.value)} />    
                </li>
                <li>
                        <input type="Number" onChange={(e) => setNewQuantity(_id, e.target.value)}  />
                </li>
            </ul>
        </div>
       
    );
};

export default UsageItemDetails;
