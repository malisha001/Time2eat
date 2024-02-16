import { useState } from "react";


    const Bookingform = () => {
        const [date, setDate] = useState('')
        const [quantity, setQuantity] = useState('')
        const [time, setTime] = useState('')
        const [error, setError] = useState(null)

    
        const handleSubmit = async (e) => {
            e.preventDefault()

            const booking = {date, quantity, time}

            const response = await fetch('/api/booking', {
                method: 'POST',
                body: JSON.stringify(booking),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()

            if (!response.ok) {
                setError(json.error)
            }
            if (!response.ok) {
                setDate('')
                setQuantity('')
                setTime('')
                setError(null)
                console.log('new booking added', json)
            }
        }
    return ( 
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Date:</label>
            <input 
               type="text"
               onChange={(e) => setDate(e.target.value)}
               value={date}/>

            <label>Quantity:</label>
            <input 
               type="text"
               onChange={(e) => setQuantity(e.target.value)}
               value={quantity}/>

            <label>Time:</label>
            <input 
               type="text"
               onChange={(e) => setTime(e.target.value)}
               value={time}/>

               <button>Add Booking</button>
               {error && <div className="error">{error}</div>} {/* Render error message if error state is not null */}       
               
        </form>
     )
}
 
export default Bookingform