// // ParentComponent.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ParentComponent = ({ selectedDateTime, setAvailableTables }) => {
//     console.log(selectedDateTime)
//     const [totalCoupleTablesBooked, setTotalCoupleTablesBooked] = useState(0);
//     const [totalGroupTablesBooked, setTotalGroupTablesBooked] = useState(0);

//     useEffect(() => {
//         if (selectedDateTime.date && selectedDateTime.time) {
//             fetchBookings(selectedDateTime.date, selectedDateTime.time);
//         }
//     }, [selectedDateTime]);
   
//     const fetchBookings = async (date, time) => {
//         try {
//             const response = await axios.get(`/api/booking`, { params: { date, time} });
//             const filteredBookings = response.data.filter(booking => booking.date === date && booking.time === time);
//             const coupleTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.couplequantity, 0);
//             const groupTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.groupquantity, 0);
//             setTotalCoupleTablesBooked(coupleTablesBooked);
//             setTotalGroupTablesBooked(groupTablesBooked);

//             // Calculate available tables by subtracting total tables booked from maximum available tables
//             const availableCoupleTables = 10 - coupleTablesBooked; // Max available couple tables minus tables already booked
//             const availableGroupTables = 15 - groupTablesBooked; // Max available group tables minus tables already booked
            
//             console.log(availableCoupleTables)
//             console.log(availableGroupTables)

//             // Update the available tables state in the NewBooking component
//             setAvailableTables({ couple: availableCoupleTables, group: availableGroupTables });
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <p>Total Couple tables booked: {totalCoupleTablesBooked}</p>
//             <p>Total Group tables booked: {totalGroupTablesBooked}</p>
//         </div>
//     );
// };

// export default ParentComponent;
