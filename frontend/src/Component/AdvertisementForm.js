import { useState } from 'react'
import { useAdvertisementsContext } from '../hooks/useAdvertisementsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios';

const AdvertisementForm = () => {
  //invoke hook
  const {dispatch } = useAdvertisementsContext()
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

    if(!user){
      setError('You must be logged in')
      return
    }

    const advertisement =  {adTitle, description,startDate,endDate,offerType}
    
    let url = '/api/advertisements'
    let method = 'POST'

    try{
      const response = await axios( {
        method,
        url,
        data: advertisement,
        headers: {
          'Content-Type': 'application/json',
          'Authorization' :`Bearer ${user.token}`
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
        dispatch({type: 'CREATE_AD', payload: addAdvertisement})

      } catch (error) {
        if (error.response && error.response.data) {
            setError(error.response.data.error)
            setEmptyFields(error.response.data.emptyFields)
        } else {
            setError('An error occurred while processing your request')
        }
    }

  }

  return (
    <form className="createAd" onSubmit={handleSubmit}> 
      <h3>Add New Advertisement</h3>

      <input 
        type="text" 
        placeholder="Advertisement Title"
        onChange={(e) => setAdTitle(e.target.value)} 
        value={adTitle}
        className={emptyFields?.includes('adTitle')? 'error' : ''}
      />

      <input 
        type="text" 
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)} 
        value={description}
        className={emptyFields?.includes('description')? 'error' : ''}
      />

      <input 
        type="date" 
        onChange={(e) => setStartDate(e.target.value)} 
        value={startDate}
        className={emptyFields?.includes('startDate')? 'error' : ''} 
      />
      
      <input 
        type="date" 
        onChange={(e) => setEndDate(e.target.value)} 
        value={endDate}
        className={emptyFields?.includes('endDate')? 'error' : ''} 
      />
     
      <input 
        type="text" 
        placeholder="Offer Type"
        onChange={(e) => setOfferType(e.target.value)} 
        value={offerType}
        className={emptyFields?.includes('offerType')? 'error' : ''} 
      />

      <button>Add Advertisement</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default AdvertisementForm
