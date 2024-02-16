// import { useEffect, useState } from "react";

// components
// import BookingDetails from '../Component/BookingDetails'
import BookingForm from '../Component/Bookingform';

const NewBooking = () => {
    // Define state for bookings
    // const [bookings, setBookings] = useState(null);

    // useEffect(() => {
    //     const fetchNewBookings = async () => {
    //         const response = await fetch('/api/booking');
    //         const json = await response.json();

    //         if (response.ok) {
    //             setBookings(json);
    //         }
    //     };

    //     fetchNewBookings();
    // }, []);

    // Return JSX
    return ( 
        <div className="newbooking">
            {/* <div className="bookings">
                {/* Check if bookings is not null before mapping */}
                {/* {bookings && bookings.map((booking) => (
                    <BookingDetails key={booking._id} booking={booking} />
                ))}
            // </div> */} *
            <BookingForm />
        </div>
    );
};
 
export default NewBooking;
// need to make changes of this newBooking.js o mybooking.js