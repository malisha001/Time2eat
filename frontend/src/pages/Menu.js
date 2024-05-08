import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './menu.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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

  // Function to handle deletion of food items
  const handleClick = async (id) => {
    const response = await fetch(`/api/fooditems/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Deleting food item with ID:", id);
      // Update food items after successful deletion
      const updatedFoodItems = foodItems.filter(item => item._id !== id);
      setFoodItems(updatedFoodItems);
    }
  };

  // Function to generate PDF report
  const generatePDFReport = () => {
    if (!foodItems) return; // No data to generate report

    const doc = new jsPDF();
    const tableColumn = ["Item Id", "Item Name", "Category", "Price(Rs)", "Cost(Rs)", "Profit(Rs)", "Average Preparetime(min)"];
    const tableRows = [];

    foodItems.forEach((item) => {
      const rowData = [
        item.Item_id,
        item.Item_name,
        item.catagory,
        item.Price,
        item.Cost,
        item.Profit,
        item.Average_preparetime
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows
    });

    doc.save("food_items_report.pdf");
  };

  // Function to filter food items based on search query
  const filterFoodItems = () => {
    if (!foodItems) return [];
    if (!searchQuery) return foodItems;
    
    return foodItems.filter(item => item.catagory.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <div className="container">
      <div className="fooditems">
        <input
          type="text"
          placeholder="Search by category"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="menu">
          <button className="menu generate-report" onClick={generatePDFReport}>
            Generate PDF Report
          </button>
          <Link to="/add-food-item">
            <button className="menu add">Add Menu</button>
          </Link>
          <table border={1}>
            <thead>
              <tr>
                <th>Item Id</th>
                <th>Item Name</th>
                <th>Category</th>
                <th>Price(Rs)</th>
                <th>Cost(Rs)</th>
                <th>Profit(Rs)</th>
                <th>Average Preparetime(min)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filterFoodItems().map((foodItem, index) => (
                <tr key={index}>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Menu;
