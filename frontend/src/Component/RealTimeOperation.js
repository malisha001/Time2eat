import { useState } from "react";
import axios from "axios";

const RealTimeOperation = ({ setUpdateIndicator }) => {
    const [cusid, setcusID] = useState('');
    const [resid, setresID] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [time, setTime] = useState('');
    const [availability, setAvailability] = useState(true);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const realtimeBookings = { cusid, date, time, quantity, resid, availability };

        try {
            const response = await axios.post('/api/realtimebooking', realtimeBookings);
            const json = response.data;

            if (response.status === 200) {
                setcusID('');
                setresID('');
                setDate('');
                setQuantity('');
                setTime('');
                setAvailability(true);
                setError(null);
                console.log('New booking added', json);

                // Trigger re-fetching of data in RealTimeIndicator
                setUpdateIndicator(prevState => !prevState);
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
            <h3>Add a New Booking</h3>
           
            <label>CusID:</label>
            <input 
               type="text"
               onChange={(e) => setcusID(e.target.value)}
               value={cusid}/>

            <label>ResID:</label>
            <input 
               type="text"
               onChange={(e) => setresID(e.target.value)}
               value={resid}/>

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

            <label>Availability:</label>
            <input
                type="radio"
                id="available"
                name="availability"
                value="true"
                checked={availability}
                onChange={() => setAvailability(true)}
            />
            <label htmlFor="available">Available</label>

            <button>Add Booking</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default RealTimeOperation;
