import React, {useState,useEffect } from "react"
import { useAdvertisementsContext } from "../hooks/useAdvertisementsContext"
import {useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom';
// components
import AdvertisementDetails from "../components/AdvertisementDetails"

const AdvertisementPage = () => {
  const { advertisements, dispatch } = useAdvertisementsContext()
  const {user } = useAuthContext()
  const [searchTerm, setSearchTerm] = useState('');
  
  //useEffect hook - fire a function when the componet is rended
    //display all advertisements
  useEffect(() => {
    const fetchAdvertisements = async () => {
      const response = await fetch('/api/advertisements', {
        headers: {
          'Authorization' :`Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type: 'SET_ADS', payload: json})
      }
    }

    // if have a value for the user
    if (user){
      fetchAdvertisements()
    }
  }, [dispatch, user]);

  //Function to filter advertisement by title
    const filteredAdvertisements = (advertisements, term)=> {
      return advertisements.filter(
        (advertisement) =>
        advertisement.adTitle && 
        advertisement.adTitle.toLowerCase().includes( term.toLowerCase())
      );
    };

   
  return (
    <div className="advertisementPage">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by AdTitle"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} // Ensure search query is converted to lowercase
      />
        <div> 
          <Link to={`/create-advertisement`}> 
          <button>Add Advertisement</button> </Link>
        </div>

      <div className="advertisements">
        {advertisements && 
          (searchTerm ?
            filteredAdvertisements(advertisements,searchTerm).map((advertisement) => (
              <AdvertisementDetails 
                advertisement={advertisement} 
                key={advertisement._id} />
            )) :
            advertisements && advertisements.map((advertisement) => (
              <AdvertisementDetails 
                advertisement={advertisement} 
                key={advertisement._id} />
            ))
          )}
        </div>
      </div>
  );
};

export default AdvertisementPage
