import { Link } from "react-router-dom";

const FeedbackDetails = ({fed,onDelete}) => {
    

    const handleClick = async () => {
    const response = await fetch('/api/feedback/' + fed._id,{
     method: 'DELETE'
    })

     if(response.ok){
        onDelete(fed._id)
        window.location.reload();
     }
   }

    return(
        <div className="FeedbackDetails">
            <h4>{fed.title}</h4>
            <p><strong>Feedback Id :</strong>{fed.feedback_Id}</p>
            <p><strong>Customer Name :</strong>{fed.customer_name}</p>
            <p><strong>Contact Number :</strong>{fed.contact_number}</p>
            <p><strong>Comment :</strong>{fed.comment}</p>
            
            <button className="delete-button" onClick={handleClick}>Delete</button>
            <Link to={`/update-feedback/${fed._id}`}>
                <button className="update-button">Update</button>
            </Link>
            
        </div>
    );
};
export default FeedbackDetails;