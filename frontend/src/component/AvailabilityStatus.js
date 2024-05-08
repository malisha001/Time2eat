import React, { useState, useEffect } from 'react';
import axios from 'axios';
const AvailabilityStatus = ({ restaurantId }) => {
  const [availabilityPercentage, setAvailabilityPercentage] = useState(0);
  const [tabledetails,settabledetails] = useState('')

  useEffect(() => {
    console.log("Restaurant ID:", restaurantId); // Log the restaurant ID
  
    const fetchRealTimeBookings = async () => {
      try {
        // Make API call or fetch data from database using restaurantId
        const response = await fetch(`/api/realtimebooking/${restaurantId}`);
        const data = await response.json();
  
        // Fetch restaurant details
        const tabledataResponse = await axios.get(`/api/restaurants/${restaurantId}`);
        const tabledata = tabledataResponse.data;
        console.log("Table Data:", tabledata);
  
        // Update tabledetails state with fetched data
        settabledetails(tabledata);
  
        // Calculate availableTables from the fetched data
        const availableTables = data.reduce((total, table) => total + table.couplequantity, 0) + data.reduce((total, table) => total + table.groupquantity, 0);
        console.log(availableTables)
        // Calculate totalTables after tabledetails has been updated
        const totalTables = tabledata.Couple_table + tabledata.Group_table;
        console.log("Total Tables:", totalTables);
  
        // Calculate percentage
        const percentage = (availableTables / totalTables) * 100;
        setAvailabilityPercentage(percentage);
      } catch (error) {
        console.error('Error fetching real-time booking data:', error);
      }
    };
  
    fetchRealTimeBookings();
  }, [restaurantId]);
  

  let availabilityColor;

  if (availabilityPercentage >= 0 && availabilityPercentage <= 30) {
    availabilityColor = 'green';
  } else if (availabilityPercentage > 30 && availabilityPercentage <= 60) {
    availabilityColor = 'yellow';
  } else if (availabilityPercentage > 60 && availabilityPercentage <= 90) {
    availabilityColor = 'orange';
  } else if (availabilityPercentage > 90 && availabilityPercentage <= 100) {
    availabilityColor = 'red';
  }

  const circleStyle = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    margin: '-5px',
    marginTop: '2px',
    backgroundColor: availabilityColor // Dynamically set the background color
  };

  return (
    <div className="home-page">
      <div style={circleStyle}></div>
    </div>
  );
};

export default AvailabilityStatus;