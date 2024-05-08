import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Admin from "./Admin";
import "./Updaterestaurants.css"

const Updaterestaurants = () => {
    const { id } = useParams(); // Get the restaurant id from URL params
    const navigate = useNavigate();

    const [values, setValues] = useState({
       
        status: ''
    });

    useEffect(() => {
        // Fetch restaurant details based on id
        const fetchrestaurant = async () => {
            try {
                const response = await fetch(`/api/restaurants/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setValues(data);
                } else {
                    console.error("Failed to fetch restaurant");
                }
            } catch (error) {
                console.error("Error fetching restaurant:", error);
            }
        };
        fetchrestaurant();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/restaurants/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                if (values.status === 'true') {
                    alert('An email will be sent to the relevant email address upon acceptance.');
                }
                navigate('/restaurants'); 
            } else {
                console.error("Failed to update restaurant");
            }
        } catch (error) {
            console.error("Error updating restaurant:", error);
        }
    };
    

    const handleStatusChange = (e) => {
        const statusValue = e.target.value;
        setValues({ ...values, status: statusValue });
    };

    return ( 
        <div className="upd-container">
         <Admin/>
         <div className="updaterestaurants-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Status:</label>
                    <div>
                        <label>
                            <input 
                                type="radio" 
                                value="true" 
                                checked={values.status === "true"} 
                                onChange={handleStatusChange} 
                            />
                            Accept
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                value="false" 
                                checked={values.status === "false"} 
                                onChange={handleStatusChange} 
                            />
                            Reject
                        </label>
                    </div>
                </div>
                
                <button type="submit">Change Status</button>
            </form>
        </div>
        </div>
    );
};

export default Updaterestaurants;
