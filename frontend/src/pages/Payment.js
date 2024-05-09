import React, { useState } from 'react';
import { Card, Button, Typography, Box, Grid, TextField, CardActions } from '@mui/material';
import Navbar from '../component/Navbar';
import axios from 'axios';

function Payment() {
  const [paymentData, setPaymentData] = useState({
    nameoncard: '',
    bank: '',
    branch: '',
    cardno: '',
    date: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitPayment = async () => {
    try {
      await axios.post('/api/onlinepayemnt', paymentData);
      console.log('Payment submitted successfully');
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <Box sx={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          <Grid item xs={7}>
            <Box sx={{ marginLeft: '60px', marginRight: '60px', marginTop: '40px', marginBottom: '40px' }}>
              <h4>Rider Details:</h4>
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
                <CardActions>
                  <Button onClick={handleSubmitPayment} sx={{ ml: '150px' }}>Pay Now</Button>
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
