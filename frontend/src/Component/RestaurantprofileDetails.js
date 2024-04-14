import { Link } from "react-router-dom";


const RestaurantprofileDetails = ({ res, onDelete }) => {

    const handleClick = async () => {
        const response = await fetch('/api/restaurants/' + res._id, {
            method: 'DELETE'
        });

        if (response.ok) {
            onDelete(res._id); 
            // auto render
            window.location.reload();
        }
    };

    return (
        <div className="RestaurantDetails">
            <h4>{res.title}</h4>
            <p><strong>Restaurant Id :</strong>{res.Restaurant_Id}</p>
            <p><strong>Restaurant License Number :</strong>{res.Restaurant_licensenumber}</p>
            <p><strong>Restaurant Name :</strong>{res.Restaurant_name}</p>
            <p><strong>Restaurant Manager's Name :</strong>{res.Restaurant_Managersname}</p>
            <p><strong>Email Address :</strong>{res.Email_address}</p>
            <p><strong>Contact :</strong>{res.contact}</p>
            <p><strong>Password :</strong>{res.Password}</p>
            <p><strong>Confirm Password :</strong>{res.Confirm_paasword}</p>
            <p><strong>Address :</strong>{res.Address}</p>
            <p><strong>Couple Table :</strong>{res.Couple_table}</p>
            <p><strong>Group Table :</strong>{res.Group_table}</p>
            


            
            <button className="delete-button" onClick={handleClick}>Delete</button>
            <Link to={`/update-restaurantprofile/${res._id}`}>
                <button className="update-button">Update</button>
            </Link>
        </div>
    );
};

export default RestaurantprofileDetails;

