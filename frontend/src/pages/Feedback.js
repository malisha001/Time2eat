import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import FeedbackDetails from "../component/feedbackD/FeedbackDetails";
import jsPDF from 'jspdf';
import 'jspdf-autotable';



const Feedback = () => {
  const [fed, setFed] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedback/');
      const json = await response.json();

      if (response.ok) {
        setFed(json);
      }
    };
    fetchFeedbacks();
  }, [searchQuery]); // Include searchQuery as a dependency


  const generatePDFReport = () => {
    if (!fed) return; // No data to generate report
    const doc = new jsPDF();
  
    
    const logoWidth = 30;
    const logoHeight = 30;
    const businessNameX = 10 + logoWidth + 10;
    
  
    // Add logo to the PDF document

    doc.setFontSize(16);
    doc.text("Restaurant Reservation and Food Ordering System", businessNameX , 20);
  
    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 30, doc.internal.pageSize.getWidth() - 10, 30);
  
    // Add "Dine-In Orders Daily Report" text
    const reportTitle = 'Feedbacks Daily Report';
    const titleX = 70;
    
    doc.setFontSize(14);
    doc.text(reportTitle, titleX, 40); // Center the text horizontally
  
  
    const tableColumn = ["Feedback ID", "Customer Name", "Contact Number", "Comment"];
    const tableRows = [];
     
    fed.forEach((fed) => {
      const rowData = [
        fed.feedback_Id,
        fed.customer_name,
        fed.contact_number,
        fed.comment
        
      ];
      tableRows.push(rowData);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50
    });
  
    doc.save("Feedbacks_report.pdf");
  };
  
  


  const handleDelete = async (itemId) => {
    console.log("Deleting feedback with ID:", itemId);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering feedbacks based on search query
  const filteredFeedbacks = fed && fed.filter((feedback) =>
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

  const generateButtonStyle = {
    backgroundColor: 'blue',
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
    marginTop: '70px', // Adjusted marginTop to position below the Add Feedback button
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
      <button onClick={generatePDFReport}
      style={generateButtonStyle} 
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      >
        Generate PDF Report</button>

    </div>
  );
};

export default Feedback;
