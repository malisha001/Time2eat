// FilterComponent.js
import React, { useState } from 'react';

const FilterComponent = ({ onFilter }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onFilter function passed from parent component with date and time
    onFilter({ date, time });
  };

  return (
    <div>
      <h2>Check Tables Availability</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          required
        />
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={handleTimeChange}
          required
        />
        <button type="submit">Check Availability</button>
      </form>
    </div>
  );
};

export default FilterComponent;
