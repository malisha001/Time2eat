// // BookingForm.js
// import React, { useState } from "react";
// import axios from "axios";

// const BookingForm = ({ availableTables, selectedDateTime }) => {
//     const [couplequantity, setCouplequantity] = useState('');
//     const [groupquantity, setGroupquantity] = useState('');
//     const [error, setError] = useState(null);
    
//     console.log(selectedDateTime)
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const totalCoupleTablesRequested = parseInt(couplequantity);
//         const totalGroupTablesRequested = parseInt(groupquantity);

//         // Check if the requested couple tables exceed the available couple tables
//         if (totalCoupleTablesRequested > availableTables.couple) {
//             setError('The requested couple table count exceeds the available couple tables.');
//             return;
//         }

//         // Check if the requested group tables exceed the available group tables
//         if (totalGroupTablesRequested > availableTables.group) {
//             setError('The requested group table count exceeds the available group tables.');
//             return;
//         }

//         const booking = { 
//             time: selectedDateTime.time,
//             date: selectedDateTime.date, 
//             couplequantity: couplequantity, 
//             groupquantity: groupquantity, 
            
//         };

//         try {
//             const response = await axios.post('/api/booking', booking);
//             const json = response.data;

//             if (response.status === 200) {
//                 setCouplequantity('');
//                 setGroupquantity('');
//                 setError(null);
//                 console.log('New booking added', json);
//             } else {
//                 setError(json.error);
//             }
//         } catch (error) {
//             console.error('Error adding booking:', error);
//             setError('An error occurred while adding the booking.');
//         }
//     };

//     return ( 
//         <form className="create" onSubmit={handleSubmit}>
//             <h3>Add a New Booking</h3>

//             <label>Couple Tables:</label>
//             <input 
//                type="number"
//                onChange={(e) => setCouplequantity(e.target.value)}
//                value={couplequantity}/>

//             <label>Group Tables:</label>
//             <input 
//                type="number"
//                onChange={(e) => setGroupquantity(e.target.value)}
//                value={groupquantity}/>

//             <button>Add Booking</button>
//             {error && <div className="error">{error}</div>}
//         </form>
//     );
// };
 
// export default BookingForm;
