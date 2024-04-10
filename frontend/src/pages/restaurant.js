import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import RestaurantDetails from "../Component/restaurantDetails";


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
  
  const handleDelete = async (RestaurantId) => {
    console.log("Deleting restaurant with ID:", RestaurantId);
  };


  return (
    <div className="res">
      <div className="restaurant">
        {restaurants && restaurants.map((restaurant) => (
          <RestaurantDetails key={restaurant._id} res={restaurant} onDelete={handleDelete}/>
        ))}
      </div>
      <Link to="/addrestaurants"><button>Add Restaurant</button></Link>
    </div>
  );
};

export default Restaurant;
