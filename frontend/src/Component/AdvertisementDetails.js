// import React from 'react';
// import { useAdvertisementsContext } from "../hooks/useAdvertisementsContext";
// import { useAuthContext } from "../hooks/useAuthContext";
// import { Link } from 'react-router-dom';
// import { format } from 'date-fns';
// //date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// const AdvertisementDetails = ({ advertisement }) => {
//   const { dispatch } = useAdvertisementsContext()
//   const { user } = useAuthContext()
  
// // Function to handle advertisement deletion
//   const handleDelete = async () => {

//     if(!user){ return}

//     const response = await fetch('/api/advertisements/' + advertisement._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization' : `Bearer ${user.token}`
//       }
//     });

//     const json = await response.json()

//     if(response.ok){
//         dispatch({type: 'DELETE_AD',payload: json})
//     }
//   };

//   //Function to format date using date-fns
//   const formatDate = (dateString) => {
//     return format(new Date(dateString), 'MMM dd, yyyy');
//   };
  
//   return (
   
//       <div className="advertisement-details">
//         <h4>{advertisement.adTitle}</h4>
//         <p><strong>Description: </strong>{advertisement.description}</p>
//         <p><strong>Start date: </strong>{formatDate(advertisement.startDate)}</p>
//         <p><strong>End date: </strong>{formatDate(advertisement.endDate)}</p>
//         <p><strong>OfferType: </strong>{advertisement.offerType}</p>
//         <p><strong>Status: </strong>{advertisement.isApproved}</p>
//         <br></br>
//         <p>{formatDistanceToNow(new Date(advertisement.createdAt), { addSuffix: true})}</p>
//         {/* <div> 
//           <button  onClick= {viewClick}>view</button>
//         </div> */}
//         <div> 
//         <Link to={`/update-advertisement/${advertisement._id}`}> 
//           <button>update</button> </Link>
//         </div>
//         <div> 
//           <button className="material-symbols-outlined" onClick= {handleDelete}>delete</button></div>
//       </div>
//     )
// }
  
//   export default AdvertisementDetails