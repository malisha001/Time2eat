import React, {useState} from "react";
import axios from "axios";

function DineCustomerRegForm() {
    const [cusid, setcusID] = useState('');
    const [resid, setresID] = useState('');
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [couplequantity, setCouplequantity] = useState('');
    const [groupquantity, setGroupquantity] = useState('');
    const [telephoneno, setTelephone] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const DineCustomerRegForm = {cusid, resid, name, time, date, couplequantity, groupquantity, telephoneno}

        try {
            const response = await axios.post('/api/realtimebooking', DineCustomerRegForm);
            await axios.post('/api/customerhistoryroute', DineCustomerRegForm);
            const json = response.data;

            if (response.status === 200) {
                setcusID('');
                setresID('');
                setName('');
                setTime('');
                setDate('');
                setCouplequantity('');
                setGroupquantity('');
                setTelephone('');
                setError(null);
                console.log('New booking added', json);

        } else {
            setError(json.error);
        }
        } catch (error) {
            console.error('Error adding booking:', error);
            setError('An error occurred while adding the booking.');
        }
    }

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

            <label>Name:</label>
            <input 
               type="text"
               onChange={(e) => setName(e.target.value)}
               value={name}/>

            <label>Time:</label>
            <input 
               type="time"
               onChange={(e) => setTime(e.target.value)}
               value={time}/>       

            <label>Date:</label>
            <input 
               type="date"
               onChange={(e) => setDate(e.target.value)}
               value={date}/>

            <label>CoupleQuantity:</label>
            <input 
               type="number"
               onChange={(e) => setCouplequantity(e.target.value)}
               value={couplequantity}/>

            <label>Groupquantity:</label>
            <input 
               type="number"
               onChange={(e) => setGroupquantity(e.target.value)}
               value={groupquantity}/>

            <label>Telephone No:</label>
            <input 
               type="text"
               onChange={(e) => setTelephone(e.target.value)}
               value={telephoneno}/>

            <button>Add Booking</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default DineCustomerRegForm;