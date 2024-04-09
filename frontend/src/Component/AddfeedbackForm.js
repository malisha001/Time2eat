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
        <form className="create" onSubmit={handleSubmit}>
            <h2>Add Feedback</h2>

            <label>Feedback ID:</label>
            <input
                type="text"
                name="feedback_Id"
                onChange={(e) => setFeedback_Id(e.target.value)}
                value={feedback_Id}
            />

            <label>Customer Name:</label>
            <input
                type="text"
                onChange={(e) => setCustomer_name(e.target.value)}
                value={customer_name}
            />

            <label>Contact :</label>
            <input
                type="text"
                onChange={(e) => setContact_number(e.target.value)}
                value={contact_number}
            />

            <label>Comment:</label>
            <input
                type="text"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
            />


            <button type="submit">Add Feedback</button>

            {error && <div className="error">{error}</div>}
        </form>
    );
};

export default AddfeedbackForm;