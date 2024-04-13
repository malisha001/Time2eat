import { useEffect, useState } from "react";
import axios from "axios";

const AllCustomerDineInHistory = () => {
    const [dineBookings, setDineBookings] = useState(null);

    useEffect(() => {
        const fetchDineInBookings = async () => {
            try {
                const response = await axios.get('/api/customerhistoryroute');
                const data = response.data;
                console.log()
                setDineBookings(data);
            } catch (error) {
                console.error('Error fetching Dine In Bookings:', error);
            }
        };

        fetchDineInBookings();
    }, []);

    const handleClick = async (deleteDineBookings) => {
        try {
            console.log(deleteDineBookings)
            await axios.delete(`/api/customerhistoryroute/${deleteDineBookings}`);
            
            setDineBookings(prevBookings => prevBookings.filter(dineBooking => dineBooking._id !== deleteDineBookings));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    }
    

    return ( 
        <div>
            {dineBookings && dineBookings.map((dineBooking) => (
                
                <div key={dineBooking._id}>
                    <p><strong>Customer ID : </strong>{dineBooking.cusid}</p>
                    <p><strong>Res ID : </strong>{dineBooking.resid}</p>
                    <p><strong>Name : </strong>{dineBooking.name}</p>
                    <p><strong>Time : </strong>{dineBooking.time}</p>
                    <p><strong>Date : </strong>{dineBooking.date}</p>
                    <p><strong>Couple Tables : </strong>{dineBooking.couplequantity}</p>
                    <p><strong>Group Tables : </strong>{dineBooking.groupquantity}</p>
                    <p><strong>Telephone No : </strong>{dineBooking.telephoneno}</p>
                    <button onClick={() => handleClick(dineBooking._id)}>delete</button>
                </div>
            ))}
        </div>
     );
}
 
export default AllCustomerDineInHistory;
