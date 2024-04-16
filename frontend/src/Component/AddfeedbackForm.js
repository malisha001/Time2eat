import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddfeedbackForm = () => {
    const navigate = useNavigate();
    const [feedback_Id, setFeedback_Id] = useState('');
    const [customer_name, setCustomer_name] = useState('');
    const [contact_number, setContact_number] = useState('');
    const [comment, setComment] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const feedback = { feedback_Id, customer_name, contact_number, comment};

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
                setError(json.error);
            } else {
                setFeedback_Id('');
                setCustomer_name('');
                setContact_number('');
                setComment('');
                setError(null);
                console.log('New feedback added', json);

                // Navigate to the desired page
                navigate('/feedback');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "maroon" }}>
            <form style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "20px", borderRadius: "10px"}} onSubmit={handleSubmit}>
                <h2>Add Feedback</h2>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Feedback ID:</label>
                    <input
                        type="text"
                        name="feedback_Id"
                        onChange={(e) => setFeedback_Id(e.target.value)}
                        value={feedback_Id}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Customer Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setCustomer_name(e.target.value)}
                        value={customer_name}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Contact :</label>
                    <input
                        type="text"
                        onChange={(e) => setContact_number(e.target.value)}
                        value={contact_number}
                        style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ fontWeight: "bold" }}>Comment:</label>
                    <input
                        type="text"
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        style={{ width: "100%", padding: "50px", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
                    />
                </div>

                <button style={{ backgroundColor: "maroon", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", margin: "0 auto", display: "block" }} type="submit">Submit</button>


                {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
            </form>
        </div>
    );
};

export default AddfeedbackForm;
