import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantprofileDetails from "../component/RestaurantprofileDetails";
import { useAuthContext } from '../hooks/useAuthContext';

const RestaurantProfile = () => {
  const [restaurant, setRestaurant] = useState(null);
  const { id } = useParams();
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`/api/restaurants/${user.oid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant");
        }
        const data = await response.json();
        setRestaurant(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRestaurant();
  }, [user]);

  const handleDelete = async (restaurantId) => {
    console.log("Deleting restaurant with ID:", restaurantId);
  };

  return (
    <div className="restaurant-profile">
      {restaurant && <RestaurantprofileDetails res={restaurant} onDelete={handleDelete} />}
    </div>
  );
};

export default RestaurantProfile;
