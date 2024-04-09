import React, { useState } from 'react';
import { TextField, Button, Typography, Rating } from '@material-ui/core';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    feedbackId: '',
    customerName: '',
    contactNumber: '',
    rating: 0,
    comment: '',
    photos: [] 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleRatingChange = (e, value) => {
    setFeedback({ ...feedback, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to the backend
      const response = await axios.post('/api/feedback', feedback);
      console.log(response.data); // Log the response from the server
      // Reset form fields after successful submission
      setFeedback({
        feedbackId: '',
        customerName: '',
        contactNumber: '',
        rating: 0,
        comment: '',
        photos: []
      });
      // Optionally show a success message to the user
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error if submission fails
      // Optionally show an error message to the user
      alert('Error submitting feedback. Please try again later.');
    }
  };

  return (
    <div className="feedback-form">
      <Typography variant="h4">Feedback Form</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="Feedback ID"
          name="feedbackId"
          value={feedback.feedbackId}
          onChange={handleInputChange}
        />
        <TextField
          required
          label="Customer Name"
          name="customerName"
          value={feedback.customerName}
          onChange={handleInputChange}
        />
        <TextField
          required
          label="Contact Number"
          name="contactNumber"
          type="number"
          value={feedback.contactNumber}
          onChange={handleInputChange}
        />
        <Typography>Rating:</Typography>
        <Rating
          name="rating"
          value={feedback.rating}
          onChange={handleRatingChange}
        />
        <TextField
          required
          label="Feedback Comment"
          name="comment"
          multiline
          rows={4}
          value={feedback.comment}
          onChange={handleInputChange}
        />
        {/*photo upload fields */}
        <Button type="submit" variant="contained" color="primary">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;
