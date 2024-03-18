// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const UpdateBookingDetails = () => {
//     const { id } = useParams(); // Get the booking id from URL params

//     const [values, setValues] = useState({
//         date: '',
//         quantity: '',
//         time: ''   
//     });

//     useEffect(() => {
//         axios.get(`/api/booking/${id}`)
//         .then(res => {
//             setValues({
//                 ...values,
//                 date: res.data.date,
//                 quantity: res.data.quantity,
//                 time: res.data.time
//             });
//         })
//         .catch(err => console.log(err));
//     }, [id]); // Add id as a dependency to trigger effect when id changes

//     const navigate = useNavigate()
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axios.patch(`/api/booking/${id}`, values) // Fix the syntax error here
//         .then(res => {
//             navigate('/');
//         })
//         .catch(err => console.log(err)); // Fix the formatting here
//     }
    
//     return ( 
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <h3>Add a New Workout</h3>
//                 <div>
//                     <label>Date:</label>
//                     <input 
//                         type="date"
//                         value={values.date}
//                         onChange={e => setValues({...values, date: e.target.value})}
//                     />
//                 </div>
//                 <div>
//                     <label>Quantity:</label>
//                     <input 
//                         type="number"
//                         value={values.quantity}
//                         onChange={e => setValues({...values, quantity: e.target.value})}
//                     />
//                 </div>
//                 <div>
//                     <label>Time:</label>
//                     <input 
//                         type="time"
//                         value={values.time}
//                         onChange={e => setValues({...values, time: e.target.value})}
//                     />
//                 </div>
//                 <button >Update</button>
//             </form>
//         </div>
//     );
// };

// export default UpdateBookingDetails;


// NewBooking.js
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import UpdateBookingForm from './UpdateBookingForm';
import UpdateParentComponent from './UpdateParentComponent';
import UpdateCheckAvailability from './UpdateCheckAvailability';

const UpdateBookingDetails = () => {
    const { id } = useParams();
    const [customerID, setCustomerID] = useState(id);
    const [selectedDateTime, setSelectedDateTime] = useState({ date: '', time: '' });
    const [availableTables, setAvailableTables] = useState({ couple: 10, group: 15 });

    const handleFilter = (filterData) => {
        setSelectedDateTime(filterData);
    };
    console.log(selectedDateTime)
    console.log(customerID)
    console.log(availableTables)
    return ( 
        <div className="newbooking">
            <p>This is an Update page</p>
            <div className="bookings">
                <UpdateCheckAvailability checkDateTime={handleFilter} customerID={customerID} />
                <UpdateParentComponent selectedDateTime={selectedDateTime} setAvailableTables={setAvailableTables} customerID={customerID}/>
                <UpdateBookingForm 
                    availableTables={availableTables}
                    selectedDateTime={selectedDateTime}
                    customerID={customerID}
                />
            </div>
        </div>
    );
};

export default UpdateBookingDetails;

