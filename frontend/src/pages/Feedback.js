import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FeedbackDetails from "../component/FeedbackDetails";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedback');
      const json = await response.json();

      if (response.ok) {
        setFeedbacks(json);
      }
    };
    fetchFeedbacks();
  }, []);

  const handleDelete = async (itemId) => {
    console.log("Deleting feedback with ID:", itemId);
  };

  const buttonStyle = {
    backgroundColor: 'orange',
    color: 'white',
    borderRadius: '8px',
    padding: '10px 20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    outline: 'none',
    fontSize: '16px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const handleHover = (e) => {
    e.target.style.transform = 'translate(-50%, -50%) scale(1.05)';
  };

  const handleLeave = (e) => {
    e.target.style.transform = 'translate(-50%, -50%)';
  };

  return (
    <div className="feedback" style={{ position: 'relative', height: '100vh' }}>
      <div className="fed">
        {feedbacks && feedbacks.map((feedback) => (
          <FeedbackDetails key={feedback._id} fed={feedback} onDelete={handleDelete} />
        ))}
      </div>
      <Link to="/add-feedback">
        <button
          style={buttonStyle}
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          Add Feedback
        </button>
      </Link>
    </div>
  );
};

export default Feedback;
