import { useEffect, useState } from "react";
import FooditemDetails from '../Component/FooditemsDetails';


const AllfoodItems = () => {
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


  return (
    <div className="fooditems">
      <div className="menu">
        {foodItems && foodItems.map((foodItem) => (
          <FooditemDetails key={foodItem._id} fooditem={foodItem}/>
        ))}
      </div>
    </div>
  );
};

export default AllfoodItems;
