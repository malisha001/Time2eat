// // Home.js
// import React, { useState, useEffect } from 'react';

// const availabilitystatus = () => {
//   const [availabilityPercentage, setAvailabilityPercentage] = useState(0);

//   useEffect(() => {
//     const fetchRealTimeBookings = async () => {
//       try {
//         // Make API call or fetch data from database
//         const response = await fetch('api/realtimebookings');
//         const data = await response.json();

//         const availableTables = response.data.reduce((total, table) => total + table.couplequantity, 0) + response.data.reduce((total, table) => total + table.groupquantity, 0);
//         const totalTables = data.availableTables;
//         const percentage = (availableTables / totalTables) * 100;

//         setAvailabilityPercentage(percentage);
//       } catch (error) {
//         console.error('Error fetching real-time booking data:', error);
//       }
//     };

//     fetchRealTimeBookings();
//   }, []);

//   let availabilityColor;

//   if (availabilityPercentage >= 0 && availabilityPercentage <= 30) {
//     availabilityColor = 'green';
//   } else if (availabilityPercentage > 30 && availabilityPercentage <= 60) {
//     availabilityColor = 'yellow';
//   } else if (availabilityPercentage > 60 && availabilityPercentage <= 90) {
//     availabilityColor = 'orange';
//   } else if (availabilityPercentage > 90 && availabilityPercentage <= 100) {
//     availabilityColor = 'red';
//   }

//   return (
//     <div className="home-page">
//       <h2>Restaurant Availability</h2>
//       <div className={`availability-circle ${availabilityColor}`}></div>
//     </div>
//   );
// };

// export default availabilitystatus;
