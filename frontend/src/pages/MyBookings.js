import { useEffect } from "react";
import { useBookingsContext } from "../hooks/useBookingsContext";
import axios from "axios";

// components
// import BookingForm from '../Component/Bookingform';
import BookingDetails from '../component/BookingDetails'
const MyBookings = () => {
    const {bookings, dispatch} = useBookingsContext();
    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const response = await axios.get('/api/booking');
                const data = response.data;

                dispatch({ type: 'SET_BOOKINGS', payload: data });
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

         // Add condition to prevent unnecessary fetch
            fetchMyBookings();
      

    }, [dispatch]);

    // Return JSX
    return ( 
        <div className="myBookings">
            <div className="bookings">
                {/* Check if bookings is not null before mapping */}
                {bookings && bookings.map((booking) => (
                    <BookingDetails key={booking._id} booking={booking} />
                ))}
            </div>
            
        </div>
    );
};
 
export default MyBookings;
// need to make changes of this newBooking.js o mybooking.js