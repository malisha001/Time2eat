import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FeedbackDetails from "../Component/FeedbackDetails";



const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedback/');
      const json = await response.json();

      if (response.ok) {
        setFeedbacks(json);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = async (itemId) => {
    console.log("Deleting food item with ID:", itemId);
  };


  return (
    <div className="feedback">
      <div className="fed">
        {feedbacks && feedbacks.map((feedback) => (
          <FeedbackDetails key={feedback._id} fed={feedback} onDelete={handleDelete} />
        ))}
      </div>
      <Link to="/add-feedback"><button>Add Feedback</button></Link>
    </div>
  );
};

export default Feedback;