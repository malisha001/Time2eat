// CheckAvailability.js
import React, { useState } from 'react';

const CheckAvailability = ({ checkDateTime }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleTime = (event) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkDateTime({ date, time });

    console.log(date, time)
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
          onChange={handleDate}
          required
        />
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={handleTime}
          required
        />
        <button type="submit">Check Availability</button>
      </form>
    </div>
  );
};

export default CheckAvailability;
