import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import './menu.css'

const Menu = () => {
  const [foodItems, setFoodItems] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFoodItems = async () => {
      const response = await fetch("/api/fooditems/");
      const json = await response.json();

      if (response.ok) {
        setFoodItems(json);
      }
    };
    fetchFoodItems();
  }, []);

  const column = [
    "Item Id",
    "Item Name",
    "Category",
    "Price",
    "Average Preparetime",
    "Action",
  ];


  const handleClick = async (id) => {
    const response = await fetch(`/api/fooditems/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Deleting food item with ID:", id);
      window.location.reload(); // Refresh the page after successful deletion
    }
  };

  // Function to filter food items based on category
  const filterFoodItems = (items, query) => {
    return items.filter(
      (item) =>
        item.catagory && item.catagory.toLowerCase() === query.toLowerCase()
    );
  };

  return (
    <div className="fooditems">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by category"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="menu">
        <Link to="/add-food-item">
          <button>Add Menu</button>
        </Link>
        <table border={1}>
          <thead>
            <tr>
              {column.map((colum, index) => (
                <th key={index}>{colum}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {foodItems &&
              (searchQuery
                ? filterFoodItems(foodItems, searchQuery).map((foodItem) => (
                    <tr key={foodItem.index}>
                      <td>{foodItem.Item_id}</td>
                      <td>{foodItem.Item_name}</td>
                      <td>{foodItem.catagory}</td>
                      <td>{foodItem.Price}</td>
                      <td>{foodItem.Average_preparetime}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleClick(foodItem._id)}
                        >
                          Delete
                        </button>
                        <Link to={`/update-food-item/${foodItem._id}`}>
                          <button className="update-button">Update</button>
                        </Link>
                      </td>
                    </tr>
                  ))
                : foodItems.map((foodItem) => (
                    <tr key={foodItem.index}>
                      <td>{foodItem.Item_id}</td>
                      <td>{foodItem.Item_name}</td>
                      <td>{foodItem.catagory}</td>
                      <td>{foodItem.Price}</td>
                      <td>{foodItem.Average_preparetime}</td>
                      <td>
                        <button
                          className="delete-button"
                          onClick={() => handleClick(foodItem._id)}
                        >
                          Delete
                        </button>
                        <Link to={`/update-food-item/${foodItem._id}`}>
                          <button className="update-button">Update</button>
                        </Link>
                      </td>
                    </tr>
                  )))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Menu;
