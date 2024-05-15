import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import Navbar from "../components/Navbar";
import './menu.css';
import ResNavbar from '../component/restauretNavbar/ResNavbar';

const Menu = () => {
  const [foodItems, setFoodItems] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFoodItems = async () => {
      const response = await fetch("/api/fooditems/");
      const json = await response.json();

      if (response.ok) {
        const foodItemsWithProfit = json.map((foodItem) => ({
          ...foodItem,
          Profit: parseFloat(foodItem.Price) - parseFloat(foodItem.Cost),
        }));

        setFoodItems(foodItemsWithProfit);
      }
    };
    fetchFoodItems();
  }, []);

  const column = [
    "Item Id",
    "Item Name",
    "Category",
    "Price(Rs)",
    "Cost(Rs)",
    "Profit(Rs)",
    "Average Preparetime(min)",
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

  const filterFoodItems = (items, query) => {
    return items.filter(
      (item) =>
        item.catagory && item.catagory.toLowerCase() === query.toLowerCase()
    );
  };

  return (
    <div>
    <ResNavbar/>
    <div className="Inv-dashborad">
    <div className="container">
      {/* <Navbar />  */}
      <div className="fooditems">
        <input
          type="text"
          placeholder="Search by category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="menu">
          <Link to="/add-food-item">
            <button className="menu add">Add Menu</button>
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
                        <td>{foodItem.Cost}</td>
                        <td>{foodItem.Profit}</td>
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
                        <td>{foodItem.Cost}</td>
                        <td>{foodItem.Profit}</td>
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
    </div>
    </div>
    </div>
  );
};

export default Menu;
