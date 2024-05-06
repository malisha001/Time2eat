import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './restaurant.css'
import Admin from "../component/Admin";

const Restaurant = () => { 
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch('/api/restaurants/');
      const json = await response.json();

      if (response.ok) {
        setRestaurants(json);
      }
    };
    fetchRestaurants();
  }, []);
  const column = [
    "Restaurant Id",
    "Restaurant License Number",
    "Restaurant Name ",
    "Restaurant Manager's Name",
    "Email Address",
    "Contact",
    "Address",
    "Couple Table",
    "Group Table",
    "Status",
    
    "Action",
  ];
  const handeClick = async (id) => {
    const response = await fetch(`/api/restaurants/${id}`, {
        method: 'DELETE'
    });
  

  if (response.ok) {
    console.log("Deleting food item with ID:",id);
    window.location.reload(); // Refresh the page after successful deletion
  }
};
  return (
    <div className="container">
      <Admin/>
    <div className="res">
      <div className="restaurant">
        
      <table border={1}>
      <thead>
            <tr>
              {column.map((colum, index) => (
                <th key={index}>{colum}</th>
              ))}
            </tr>
          </thead>
          <tbody>
                {restaurants && restaurants.map((res) => (
                <tr key={res.Restaurant_Id}>
                <td>{res.Restaurant_Id}</td>
                <td>{res.Restaurant_licensenumber}</td>
                <td>{res.Restaurant_name}</td>
                <td>{res.Restaurant_Managersname}</td>
                <td>{res.Email_address}</td>
                <td>{res.contact}</td>
                <td>{res.Address}</td>
                <td>{res.Couple_table}</td>
                <td>{res.Group_table}</td>
                <td>{res.status}</td>
                <td>
                  <button
                   className="delete-button"
                   onClick={()=>handeClick(res._id)}
                   >
                    Delete
                   </button>
                   <Link to={`/update-restaurant/${res._id}`}>
                   <button className="update-button">Update</button>
                   </Link>
      </td>
      </tr>
                ))}
      </tbody>
      </table>
      <Link to="/addrestaurants"><button>Add Restaurant</button></Link>
    </div>
    </div>
    </div>
  );
  
};

export default Restaurant;
