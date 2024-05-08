import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddfeedbackForm = () => {
    const navigate = useNavigate();
    const [feedback_Id, setFeedback_Id] = useState('');
    const [customer_name, setCustomer_name] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!feedback_Id.trim()) {
            errors.feedback_Id = "Feedback ID is required";
        }

        if (!customer_name.trim()) {
            errors.customer_name = "Customer name is required";
        }

        if (!contact_number.trim()) {
            errors.contact_number = "Contact number is required";
        } else if (!/^\d+$/.test(contact_number.trim())) {
            errors.contact_number = "Contact number must contain only digits";
        }

        if (!comment.trim()) {
            errors.comment = "Comment is required";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleContactChange = (e) => {
        const inputValue = e.target.value;
        if (!/^\d*$/.test(inputValue)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                contact_number: "Contact number must contain only digits"
            }));
        } else {
            setContact_number(inputValue);
            setErrors(prevErrors => ({
                ...prevErrors,
                contact_number: '' // Clear the error message if the input is valid
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const feedback = { feedback_Id, customer_name, contact_number, comment };

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                body: JSON.stringify(feedback),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await response.json();

            if (!response.ok) {
                setErrors({ submit: json.error });
            } else {
                setFeedback_Id('');
                setCustomer_name('');
                setContact_number('');
                setComment('');
                setErrors({});
                console.log('New feedback added', json);

                // Navigate to the desired page
                navigate('/feedback');
            }
        } catch (error) {
            setErrors({ submit: error.message });
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#ff8086" }}>
            <form style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "45px", borderRadius: "10px" }} onSubmit={handleSubmit}>
                <h2>Add Feedback</h2>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Feedback ID :</label>
                    <input
                        type="text"
                        name="feedback_Id"
                        onChange={(e) => setFeedback_Id(e.target.value)}
                        value={feedback_Id}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                    {errors.feedback_Id && <div style={{ color: "red" }}>{errors.feedback_Id}</div>}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Customer Name :</label>
                    <input
                        type="text"
                        onChange={(e) => setCustomer_name(e.target.value)}
                        value={customer_name}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                    {errors.customer_name && <div style={{ color: "red" }}>{errors.customer_name}</div>}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Contact :</label>
                    <input
                        type="text"
                        onChange={handleContactChange}
                        value={contact_number}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                    {errors.contact_number && <div style={{ color: "red" }}>{errors.contact_number}</div>}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Comment :</label>
                    <input
                        type="text"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        style={{ width: "100%", padding: "50px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                    {errors.comment && <div style={{ color: "red" }}>{errors.comment}</div>}
                </div>

                <div style={{ textAlign: "center", marginTop: "30px" }}>
                    <button style={{ backgroundColor: "maroon", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px" }} type="submit">Submit</button>
                </div>

                {errors.submit && <div style={{ color: "red", marginTop: "10px" }}>{errors.submit}</div>}
            </form>
        </div>
    );
};

export default AddfeedbackForm;
