import React, { useState, useEffect } from 'react';

const AvailabilityStatus = () => {
  const [availabilityPercentage, setAvailabilityPercentage] = useState(0);

  useEffect(() => {
    const fetchRealTimeBookings = async () => {
      try {
        // Make API call or fetch data from database
        const response = await fetch('api/realtimebooking');
        const data = await response.json();

        // Calculate availableTables from the fetched data
        const availableTables = data.reduce((total, table) => total + table.couplequantity, 0) + data.reduce((total, table) => total + table.groupquantity, 0);

        // Assuming you have totalTables available in the response itself
        const totalTables = 25;  //get couple and group tables from database and get total

        const percentage = (availableTables / totalTables) * 100;

        setAvailabilityPercentage(percentage);
      } catch (error) {
        console.error('Error fetching real-time booking data:', error);
      }
    };

    fetchRealTimeBookings();
  }, []);

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
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: '10px',
    backgroundColor: availabilityColor // Dynamically set the background color
  };

  return (
    <div className="home-page">
      <h2>Restaurant Availability</h2>
      <h2>Current availability percentage: {availabilityPercentage}</h2>
      <div style={circleStyle}></div>
    </div>
  );
};

export default AvailabilityStatus;
