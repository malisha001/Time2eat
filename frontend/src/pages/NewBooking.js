// import { useEffect } from "react";
// import { useBookingsContext } from "../hooks/useBookingsContext";

// //components
// import BookingDetails from '../Component/BookingDetails'
import BookingForm from '../Component/Bookingform';

const NewBooking = () => {
   // Define state for bookings
//    const {bookings, dispatch} = useBookingsContext();

//     useEffect(() => {
//         const fetchNewBookings = async () => {
//             const response = await fetch('/api/booking');
//             const json = await response.json();

//             if (response.ok) {
//                 dispatch({type: 'SET_BOOKINGS', payload: json})
//             }
//         };

//         // Add condition to prevent unnecessary fetch
//         fetchNewBookings();
    
//     }, [dispatch]);

    // Return JSX
    return ( 
        <div className="newbooking">
            <div className="bookings">
            <BookingForm />
                {/* {bookings && bookings.map((booking) => (
                    <BookingDetails key={booking._id} booking={booking} />
                 ))}  */}
             </div>
            
        </div>
    );
};
 
export default NewBooking;
// need to make changes of this newBooking.js o mybooking.js