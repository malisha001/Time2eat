// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UpdateCheckAvailability = ({ checkDateTime, customerID }) => {
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     console.log(date, time)
//     useEffect(() => {
//         const fetchBookingData = async () => {
//             try {
//                 const response = await axios.get(`/api/booking/${customerID}`);
//                 const { date, time } = response.data;
//                 setDate(date);
//                 setTime(time);
//             } catch (error) {
//                 console.error("Error fetching data: ", error); 
//             }
//         };
        
//         fetchBookingData();
//     }, [customerID]);

//     const handleDate = (event) => {
//         setDate(event.target.value);
//     };

//     const handleTime = (event) => {
//         setTime(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         checkDateTime({ date, time });
//     };

//     return (
//         <div>
//             <h2>Check Tables Availability</h2>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="date">Date:</label>
//                 <input
//                     type="date"
//                     id="date"
//                     value={date}
//                     onChange={handleDate}
//                     required
//                 />
//                 <label htmlFor="time">Time:</label>
//                 <input
//                     type="time"
//                     id="time"
//                     value={time}
//                     onChange={handleTime}
//                     required
//                 />
//                 <button type="submit">Check Availability</button>
//             </form>
//         </div>
//     );
// };

// export default UpdateCheckAvailability;
