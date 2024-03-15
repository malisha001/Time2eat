// ParentComponent.js
import React, { useState } from 'react';
import FilterComponent from './FilterComponent';
import axios from 'axios';

const ParentComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [totalTablesBooked, setTotalTablesBooked] = useState(0);

  const handleFilter = async ({ date, time }) => {
    try {
      // Make a GET request to your backend API to fetch bookings for the provided date and time
      const response = await axios.get(`/api/booking`, {
        params: { date, time }
      });
      
      // Filter bookings for the specific date and time
      const filteredBookings = response.data.filter(booking => booking.date === date && booking.time === time);
      
      // Calculate total tables booked for the specific time slot
      const totalTablesBooked = filteredBookings.reduce((acc, booking) => acc + booking.quantity, 0);
      
      // Update state with the fetched bookings and total tables booked
      setBookings(filteredBookings);
      setTotalTablesBooked(totalTablesBooked);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      {/* Render FilterComponent passing handleFilter function */}
      <FilterComponent onFilter={handleFilter} />
      {/* Display bookings */}
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>{booking.customerName}: {booking.tables} tables</li>
        ))}
      </ul>
      {/* Display total tables booked */}
      <p>Total tables booked: {totalTablesBooked}</p>
    </div>
  );
};

export default ParentComponent;
