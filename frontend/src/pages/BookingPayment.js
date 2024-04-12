import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import groupImage from '../Assests/grouptable.jpg';

function BookingPayment() {
  return (
    <div>
      <Box sx={{ marginTop: '100px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid sx={{ bgcolor: 'blue' }} item xs={8}>
            <Box sx={{ marginLeft: '60px', marginRight: '60px' }}>
              <h2>Contact</h2>
              <h6 style={{ marginLeft: '20px' }}>076 6839636</h6>
            </Box>

            <Box sx={{ marginLeft: '60px', marginRight: '60px', marginTop: '40px', marginBottom:'40px' }}>
              <h2>Payment Details</h2>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid sx={{ bgcolor: 'green' }} item xs={4}>
            <Box sx={{ marginLeft: '60px', marginRight: '60px' }}>

            <Card sx={{ }}>

                <h4>Hello</h4>

                <Box>
                <img src={groupImage} style={{ width: '60px', height: '60px' }} />
                <h7>Table for Four</h7>
                </Box>
      
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default BookingPayment;
