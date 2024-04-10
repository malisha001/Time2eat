import { useBookingsContext } from "../hooks/useBookingsContext";
import { Link } from 'react-router-dom';
import axios from 'axios';

const BookingDetails = ( {booking} ) => {
    const { dispatch } = useBookingsContext()
    const handleClick = async () => {
        try {
            const response = await axios.delete(`/api/booking/${booking._id}`);
            const data = response.data;
    
            if (response.status === 200) {
                dispatch({ type: 'DELETE_BOOKING', payload: data });
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };
    
    return (
        <div className="booking-details">
            <h4>{booking.date}</h4>
            <p><strong>Couple Tables : </strong>{booking.couplequantity}</p>
            <p><strong>Group Tables : </strong>{booking.groupquantity}</p>
            <p><strong>Time : </strong>{booking.time}</p>
            <p>{booking.createAt}</p>
            <button onClick={handleClick}>delete</button>
            <Link to={`/update-booking/${booking._id}`}>Update</Link>

        </div>
    )

}

export default BookingDetails