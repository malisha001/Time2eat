import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FooditemDetails from '../Component/FooditemsDetails';

const FooditemProfile = () => {
  const [foodItem, setFoodItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(`/api/fooditems/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch food item");
        }
        const data = await response.json();
        setFoodItem(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFoodItem();
  }, [id]);

  const handleDelete = async (itemId) => {
    console.log("Deleting food item with ID:", itemId);
  };

  return (
    <div className="fooditem-profile">
      {foodItem && <FooditemDetails fooditem={foodItem} onDelete={handleDelete} />}
      <Link to="/add-food-item"><button>Add Menu</button></Link>
    </div>
  );
};

export default FooditemProfile;
