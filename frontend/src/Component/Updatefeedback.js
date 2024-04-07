import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateFeedback = () => {
    const { id } = useParams(); // Get the food item id from URL params
    const navigate = useNavigate();

    const [values, setValues] = useState({
        feedback_Id: '',
        customer_name: '',
        contact_number: '',
        comment: ''
        
    });

    useEffect(() => {
        // Fetch food item details based on id
        const fetchFeedbacks = async () => {
            try {
                const response = await fetch(`/api/feedback/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setValues(data);
                } else {
                    console.error("Failed to fetch food item");
                }
            } catch (error) {
                console.error("Error fetching food item:", error);
            }
        };
        fetchFeedbacks();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await fetch(`/api/feedback/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                navigate('/feedback'); // Redirect to menu after successful update
            } else {
                console.error("Failed to update food item");
            }
        } catch (error) {
            console.error("Error updating food item:", error);
        }
    }

    return ( 
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Update Feedback Details</h3>
                <div>
                    <label>Feedback ID:</label>
                    <input 
                        type="text"
                        value={values.feedback_Id}
                        onChange={e => setValues({...values, feedback_Id: e.target.value})}
                    />
                </div>
                <div>
                    <label>Customer Name:</label>
                    <input 
                        type="text"
                        value={values.customer_name}
                        onChange={e => setValues({...values, customer_name: e.target.value})}
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input 
                        type="text"
                        value={values.contact_number}
                        onChange={e => setValues({...values, contact_number: e.target.value})}
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <input 
                        type="text"
                        value={values.comment}
                        onChange={e => setValues({...values, comment: e.target.value})}
                    />
                </div>
              
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateFeedback;
