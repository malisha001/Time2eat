// NewBooking.js
import React, { useState } from 'react';
import BookingForm from '../component/Bookingform';
import ParentComponent from '../component/ParentComponent';
import CheckAvailability from '../component/CheckAvailability';

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
