import { useState } from "react";
import { useBookingsContext } from "../hooks/useBookingsContext";
import axios from "axios";

    const Bookingform = () => {
        const { dispatch } = useBookingsContext()
        const [date, setDate] = useState('')
        const [quantity, setQuantity] = useState('')
        const [time, setTime] = useState('')
        const [error, setError] = useState(null)

    
        const handleSubmit = async (e) => {
            e.preventDefault()

            const booking = {date, quantity, time}

            try {
                const response = await axios.post('/api/booking', booking); // Use Axios for POST request
    
                const json = response.data;
    
                if (response.status === 200) {
                    setDate('');
                    setQuantity('');
                    setTime('');
                    setError(null);
                    console.log('New booking added', json);
                    dispatch({ type: 'SET_BOOKING', payload: json });
                } else {
                    setError(json.error);
                }
            } catch (error) {
                console.error('Error adding booking:', error);
                setError('An error occurred while adding the booking.');
            }
        };
    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Date:</label>
            <input 
               type="date"
               onChange={(e) => setDate(e.target.value)}
               value={date}/>

            <label>Quantity:</label>
            <input 
               type="number"
               onChange={(e) => setQuantity(e.target.value)}
               value={quantity}/>

            <label>Time:</label>
            <input 
               type="time"
               onChange={(e) => setTime(e.target.value)}
               value={time}/>

               <button>Add Booking</button>
               {error && <div className="error">{error}</div>} {/* Render error message if error state is not null */}       
               
        </form>
     )
}
 
export default Bookingform