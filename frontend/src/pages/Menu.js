import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FooditemDetails from '../Component/FooditemsDetails';
import AddfooditemsForm from "../Component/AddfooditemsForm";

const Menu = () => {
  const [foodItems, setFoodItems] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      const response = await fetch('/api/fooditems/');
      const json = await response.json();

      if (response.ok) {
        setFoodItems(json);
      }
    };
    fetchFoodItems();
  }, []);

  const handleDelete = async (itemId) => {
    console.log("Deleting food item with ID:", itemId);
  };


  return (
    <div className="fooditems">
      <div className="menu">
        {foodItems && foodItems.map((foodItem) => (
          <FooditemDetails key={foodItem._id} fooditem={foodItem} onDelete={handleDelete}/>
        ))}
      </div>
      <Link to="/add-food-item"><button>Add Menu</button></Link>
    </div>
  );
};

export default Menu;
