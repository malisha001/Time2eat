import React ,{ useState } from 'react'
import { useAdvertisementsContext } from '../../hooks/useAdvertisementsContext'
import { useAuthContext } from '../../hooks/useAuthContext'
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import './AdvertisementForm.css';
import { format } from 'date-fns';

const FormContainer = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  maxWidth: '400px',
  margin: 'auto',
});

const AdvertisementForm = () => {
  //invoke hook
  const { dispatch } = useAdvertisementsContext()
  const { user } = useAuthContext()

  const [adTitle, setAdTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [offerType, setOfferType] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const advertisement = { 
      adTitle, 
      description, 
      startDate: formatDate(startDate),
      endDate: formatDate(endDate), 
      offerType }

    let url = '/api/advertisements'
    let method = 'POST'

    try {
      const response = await axios({
        method,
        url,
        data: advertisement,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })

      const addAdvertisement = response.data;

      setError(null)
      setEmptyFields([])
      setAdTitle('')
      setDescription('')
      setStartDate('')
      setEndDate('')
      setOfferType('')
      console.log('new advertisement added:', addAdvertisement)
      dispatch({ type: 'CREATE_AD', payload: addAdvertisement })
      
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error)
        setEmptyFields(error.response.data.emptyFields)
      } else {
        setError('An error occurred while processing your request')
      }
    }

  }

   // Function to format date as "yyyy-MM-dd"
   const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  };

  return (

    <form className="createAd" onSubmit={handleSubmit}>

      <FormContainer> <h5>Add New Advertisement</h5>

        <TextField
          label="Advertisement Title"
          type="text"
          placeholder="Advertisement Title"
          onChange={(e) => setAdTitle(e.target.value)}
          value={adTitle}
          error={emptyFields?.includes('adTitle')}
        />

        <TextField
          label="Description"
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          error={emptyFields?.includes('description')}
        />

        <TextField
          label="Start Date"
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          error={emptyFields?.includes('startDate')}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="End Date"
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          error={emptyFields?.includes('endDate')}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Offer Type"
          type="text"
          placeholder="Offer Type"
          onChange={(e) => setOfferType(e.target.value)}
          value={offerType}
          error={emptyFields?.includes('offerType')}
        />

        <Button variant="contained" color="primary" type="submit">
          Add Advertisement
        </Button>

        {error && <Typography variant="body1" color="error">{error}</Typography>}
      </FormContainer>
    </form>
  );
};

export default AdvertisementForm;
