import { Link } from "react-router-dom";

const FooditemDetails = ({ fooditem, onDelete }) => {
    

    const handleClick = async () => {
    const response = await fetch('/api/fooditems/' + fooditem._id,{
     method: 'DELETE'
    })

     if(response.ok){
        onDelete(fooditem._id)
        window.location.reload();
     }
   }

    return(
        <div className="fooditemdetails">
            <h4>{fooditem.title}</h4>
            <p><strong>Item_id :</strong>{fooditem.Item_id}</p>
            <p><strong>Item_name :</strong>{fooditem.Item_name}</p>
            <p><strong>category :</strong>{fooditem.catagory}</p>
            <p><strong>Price :</strong>{fooditem.Price}</p>
            <p><strong>Average_preparetime :</strong>{fooditem.Average_preparetime}</p>
            
            <button className="delete-button" onClick={handleClick}>Delete</button>
            <Link to={`/update-food-item/${fooditem._id}`}>
                <button className="update-button">Update</button>
            </Link>
            
        </div>
    );
};
export default FooditemDetails;
