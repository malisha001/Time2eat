// NewBooking.js
import React, { useState } from 'react';
import BookingForm from '..//Component/Bookingform';
import ParentComponent from '../Component/ParentComponent';
import CheckAvailability from '../Component/CheckAvailability';

const NewBooking = () => {
    const [selectedDateTime, setSelectedDateTime] = useState({ date: '', time: '' });
    const [availableTables, setAvailableTables] = useState({ couple: 10, group: 15 });

    const handleFilter = (filterData) => {
        setSelectedDateTime(filterData);
    };

    console.log(selectedDateTime); // Log selectedDateTime prop here

    return ( 
        <div className="newbooking">
            <p>This is a paragraph.</p>
            <div className="bookings">
                <CheckAvailability checkDateTime={handleFilter} />
                <ParentComponent selectedDateTime={selectedDateTime} setAvailableTables={setAvailableTables} />
                <BookingForm 
                    availableTables={availableTables}
                    selectedDateTime={selectedDateTime}
                />
            </div>
        </div>
    );
};

export default NewBooking;
