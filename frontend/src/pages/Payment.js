import React, { useState } from 'react';
import { Card, Button, Typography, Box, Grid, TextField, CardActions } from '@mui/material';
import Navbar from '../component/Navbar';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { getpaymentData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [paymentData, setPaymentData] = useState({
    nameoncard: '',
    bank: '',
    branch: '',
    cardno: '',
    date: '',
    cvv: ''
  });
  const [prices, setprices] = useState(false);
  const dlfee = 100

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitPayment = async () => {
    const data = {
      cardname:paymentData.nameoncard,
      bank: paymentData.bank,
      cardno:paymentData.cardno,
      date:paymentData.date,
      cvv:paymentData.cvv,
      pakprice:prices,
      tpayment:prices+dlfee,
      dfee:dlfee
    }

    try {
      console.log('Submitting payment:', data);
      await axios.post('/api/onlinepayemnt', data);
      console.log('Payment submitted successfully');
      navigate('/orderonthway');
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  useEffect(() => {
    const findPaymentData = async () => {
      try {
        const response = await getpaymentData(user.email);
        setprices(response.price);
        console.log('Payment data changed:', response);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    }
    

    findPaymentData();
  }, [user]);

  return (
    <div>
      <Navbar />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          <Grid item xs={7}>
            <Box sx={{ marginLeft: '60px', marginRight: '60px', marginTop: '40px', marginBottom: '40px' }}>
              <h2>Payment Details</h2>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="nameoncard"
                    name="nameoncard"
                    label="Name On Card"
                    value={paymentData.nameoncard}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="bank"
                    name="bank"
                    label="Bank"
                    value={paymentData.bank}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="branch"
                    name="branch"
                    label="Branch"
                    value={paymentData.branch}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="cardno"
                    name="cardno"
                    label="Card Number"
                    value={paymentData.cardno}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    id="date"
                    name="date"
                    label="Date"
                    value={paymentData.date}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="cvv"
                    name="cvv"
                    label="CVV"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box>
              <Card sx={{ width: '400px', padding: '20px', mt: '98px' }}>
                <h4>Hello</h4>
                <p>order price:{prices}</p>
                <p>delivery charge: 100</p>
                <p>total:{prices+dlfee}</p>
                <CardActions>
                  <Button variant='contained' onClick={handleSubmitPayment} sx={{ ml: '150px' }}>Pay Now</Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Payment;
