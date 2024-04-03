import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateDineInBookings = () => {
    const { id } = useParams(); // Get the booking id from URL params

    const [values, setValues] = useState({
        cusid: '',
        resid: '',
        name: '',
        time: '',
        date: '',
        couplequantity: '',
        groupquantity: '',
        telephoneno: ''

    });

    useEffect(() => {
        axios.get(`/api/realtimebooking/${id}`)
        .then(res => {
            setValues({
                ...values,
                cusid: res.data.cusid,
                resid: res.data.resid,
                name: res.data.name,
                time: res.data.time,
                date: res.data.date,
                couplequantity: res.data.couplequantity,
                groupquantity: res.data.groupquantity,
                telephoneno: res.data.telephoneno

            });
        })
        .catch(err => console.log(err));
    }, [id]); // Add id as a dependency to trigger effect when id changes

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`/api/realtimebooking/${id}`, values) // Fix the syntax error here
        .then(res => {
            navigate('/');
        })
        .catch(err => console.log(err)); // Fix the formatting here
    }
    
    return ( 
        <div>
             <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Booking</h3>
           
            <label>CusID:</label>
            <input 
               type="text"
               value={values.cusid}
               onChange={e => setValues({...values, cusid: e.target.value})}/>

            <label>ResID:</label>
            <input 
               type="text"
               value={values.resid}
               onChange={e => setValues({...values, resid: e.target.value})}/>

            <label>Name:</label>
            <input 
               type="text"
               value={values.name}
               onChange={e => setValues({...values, name: e.target.value})}/>

            <label>Time:</label>
            <input 
               type="time"
               value={values.time}
               onChange={e => setValues({...values, time: e.target.value})}/>       

            <label>Date:</label>
            <input 
               type="date"
               value={values.date}
               onChange={e => setValues({...values, date: e.target.value})}/>

            <label>CoupleQuantity:</label>
            <input 
               type="number"
               value={values.couplequantity}
               onChange={e => setValues({...values, couplequantity: e.target.value})}/>

            <label>Groupquantity:</label>
            <input 
               type="number"
               value={values.groupquantity}
               onChange={e => setValues({...values, groupquantity: e.target.value})}/>

            <label>Telephone No:</label>
            <input 
               type="text"
               value={values.telephoneno}
               onChange={e => setValues({...values, telephoneno: e.target.value})}/>

            <button>Add Booking</button>
        </form>
        </div>
    );
};

export default UpdateDineInBookings;