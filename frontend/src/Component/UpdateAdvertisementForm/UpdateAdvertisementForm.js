import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAdvertisementsContext } from '../../hooks/useAdvertisementsContext'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import "./UpdateAdvertisementForm.css";

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: 'auto',
  });


const UpdateAdvertisementForm = () => {
  // Invoke hooks
  const { dispatch } = useAdvertisementsContext()
  const{id} = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext()
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const[values,setValues] = useState({
    adTitle:'',
    description: '',
    startDate:'',
    endDate:'',
    offerType:''
  });
  
useEffect(() => {
    // Fetch advertisement details based on id
    const fetchAdvertisements = async () => {
        try {
            const response = await axios.get(`/api/advertisements/${id}`,{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (response.status === 200) {
                setValues(response.data);
            } else {
                console.error("Failed to fetch Advertisement");
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access: Please log in again");
                navigate('/login');// Handle unauthorized access (e.g., redirect to login page)
            } else {
                console.error("Error fetching Advertisement: ", error); 
            }        
        }
    };
    fetchAdvertisements();
  }, [id,user]);

  

const UpdateAdvertisement = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
          }
        try{
            const response = await axios.patch(`/api/advertisements/${id}`,values, {
                headers:{ 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });

            setError(null);
            setEmptyFields([]);
            console.log('Advertisement Updated:',response.data);
            dispatch({ type: 'UPDATE_AD', payload: response.data });
            navigate('/advertisement');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Unauthorized access: Please log in again");
                navigate('/login');// Handle unauthorized access (e.g., redirect to login page)
            } else {
                console.error("Error updating advertisement:", error);
            }
        }
    
    }

    return (
         <form className="updateAd" onSubmit={UpdateAdvertisement}>
        
          <h3>Update Advertisement Details</h3>
          <TextField
            type="text"
            label="Advertisement Title"
            variant="outlined"
            onChange={(e) => setValues({ ...values, adTitle: e.target.value })}
            value={values.adTitle}
            error={emptyFields.includes('adTitle')}
          />
          <TextField
            type="text"
            label="Description"
            variant="outlined"
            onChange={(e) => setValues({ ...values, description: e.target.value })}
            value={values.description}
            error={emptyFields.includes('description')}
          />
          <TextField
            type="date"
            label="Start Date"
            variant="outlined"
            onChange={(e) => setValues({ ...values, startDate: e.target.value })}
            value={values.startDate}
            error={emptyFields.includes('startDate')}
          />
          <TextField
            type="date"
            label="End Date"
            variant="outlined"
            onChange={(e) => setValues({ ...values, endDate: e.target.value })}
            value={values.endDate}
            error={emptyFields.includes('endDate')}
          />
          <TextField
            type="text"
            label="Offer Type"
            variant="outlined"
            onChange={(e) => setValues({ ...values, offerType: e.target.value })}
            value={values.offerType}
            error={emptyFields.includes('offerType')}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Advertisement
          </Button>
          {error && <div className="error">{error}</div>}
       
      </form>
     
    )
};

export default UpdateAdvertisementForm;



