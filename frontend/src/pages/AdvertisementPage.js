import React, {useState,useEffect } from "react"
import { useAdvertisementsContext } from "../hooks/useAdvertisementsContext"
import {useAuthContext } from "../hooks/useAuthContext"
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';


const AdvertisementPage = ({ advertisement }) => {
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

  const column = [
    "Advertisement Title",
    "Description",
    "Start Date",
    "End Date",
    "Offer Type",
    "Action",
  ];

  //Function to filter advertisement by title
    const filteredAdvertisements = (advertisements, term)=> {
      return advertisements.filter(
        (advertisement) =>
        advertisement.adTitle && 
        advertisement.adTitle.toLowerCase().includes( term.toLowerCase())
      );
    };

    // Function to handle advertisement deletion
  const handleDelete = async (advertisement) => {

    if(!user){ return}

    const response = await fetch('/api/advertisements/' + advertisement._id, {
      method: 'DELETE',
      headers: {
        'Authorization' : `Bearer ${user.token}`
      }
    });

    const json = await response.json()

    if(response.ok){
        dispatch({type: 'DELETE_AD',payload: json})
    }
  };

   //Function to format date using date-fns
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
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
      
      {/* Add advertisement button */}
      <div>
        <Link to={`/create-advertisement`}>
          <Button sx={{marginBottom: '10px'}} variant="contained" color="primary">Add Advertisement</Button>
        </Link>
      </div>

      <div className="advertisements">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["Advertisement Title", "Description", "Start Date", "End Date", "Offer Type", "Action"].map((column, index) => (
                  <TableCell key={index}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {advertisements && (searchTerm ?
                filteredAdvertisements(advertisements, searchTerm).map((advertisement) => (
                  <TableRow key={advertisement._id}>
                    <TableCell>{advertisement.adTitle}</TableCell>
                    <TableCell>{advertisement.description}</TableCell>
                    <TableCell>{formatDate(advertisement.startDate)}</TableCell>
                    <TableCell>{formatDate(advertisement.endDate)}</TableCell>
                    <TableCell>{advertisement.offerType}</TableCell>
                    <TableCell>
                      <Link to={`/update-advertisement/${advertisement._id}`}>
                        <Button variant="contained" color="primary">Update</Button>
                      </Link>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(advertisement)}>Delete</Button>
                    </TableCell>
                  </TableRow>
            )) :
              advertisements && advertisements.map((advertisement) => (
                  <TableRow key={advertisement._id}>
                    <TableCell>{advertisement.adTitle}</TableCell>
                    <TableCell>{advertisement.description}</TableCell>
                    <TableCell>{formatDate(advertisement.startDate)}</TableCell>
                    <TableCell>{formatDate(advertisement.endDate)}</TableCell>
                    <TableCell>{advertisement.offerType}</TableCell>
                    <TableCell>
                      <Link to={`/update-advertisement/${advertisement._id}`}>
                        <Button variant="contained" color="primary">Update</Button>
                      </Link>
                      <Button variant="contained" color="secondary" onClick={() => handleDelete(advertisement)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
     
  );
};

export default AdvertisementPage
