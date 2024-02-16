import { useEffect, useState } from "react";

// components
import BookingDetails from '../Component/BookingDetails'
const MyBookings = () => {
    // Define state for bookings
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        const fetchMyBookings = async () => {
            const response = await fetch('/api/booking');
            const json = await response.json();

            if (response.ok) {
                setBookings(json);
            }
        };

        fetchMyBookings();
    }, []);

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