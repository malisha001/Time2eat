import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const MyBookings = () => {
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const response = await axios.get('/api/booking');
                const data = response.data;
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchMyBookings();
    }, []);

    const handleDeleteBooking = async (bookingId) => {
        try {
            await axios.delete(`/api/booking/${bookingId}`);
            setBookings(bookings.filter(booking => booking._id !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    return ( 
        <div className="myBookings">
            <div className="bookings">
                {bookings && bookings.map((booking) => (
                    <div className="booking-details" key={booking._id}>
                        <h4>{booking.date}</h4>
                        <p><strong>Couple Tables : </strong>{booking.couplequantity}</p>
                        <p><strong>Group Tables : </strong>{booking.groupquantity}</p>
                        <p><strong>Time : </strong>{booking.time}</p>
                        <p>{booking.createAt}</p>
                        <button onClick={() => handleDeleteBooking(booking._id)}>Delete</button>
                        <Link to={`/update-pre-booking/${booking._id}`}>Update</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
 
export default MyBookings;
