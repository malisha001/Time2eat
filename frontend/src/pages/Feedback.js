import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FeedbackDetails from "../component/feedbackD/FeedbackDetails";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedback/');
      const json = await response.json();

      if (response.ok) {
        setFeedbacks(json);
      }
    };
    fetchFeedbacks();
  }, [searchQuery]); // Include searchQuery as a dependency

  const handleDelete = async (itemId) => {
    console.log("Deleting feedback with ID:", itemId);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering feedbacks based on search query
  const filteredFeedbacks = feedbacks && feedbacks.filter((feedback) =>
    feedback.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const buttonStyle = {
      backgroundColor: 'orange',
      color: 'white',
      borderRadius: '8px',
      border: 'none',
      padding: '10px 20px',
      transition: 'transform 0.2s',
      cursor: 'pointer',
      outline: 'none',
      fontSize: '16px',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      marginTop: '20px',
      marginBottom: '20px'
  };

  const handleHover = (e) => {
    e.target.style.transform = 'translate(-50%, -50%) scale(1.05)';
  };

  const handleLeave = (e) => {
    e.target.style.transform = 'translate(-50%, -50%)';
  };

  return (
    <div className="feedback" style={{ position: 'relative', height: '100vh' }}>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchInputChange}
        style={{ margin: '20px', padding: '10px' }}
      />
      <div className="fed">
        {filteredFeedbacks && filteredFeedbacks.map((feedback) => (
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
