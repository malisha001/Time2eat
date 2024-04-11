import React, {useState} from "react";
// import {Table, TableBody, TableHead, TableRow, TableCell,TableContainer,Paper,Button} from '@mui/material';
import {Grid, Paper} from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import groupImage from '../Assests/grouptable.jpg';
import axios from "axios";

function DineCustomerRegForm() {
    const [cusid, setcusID] = useState('');
    const [resid, setresID] = useState('');
    const [name, setName] = useState('');
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [couplequantity, setCouplequantity] = useState('');
    const [groupquantity, setGroupquantity] = useState('');
    const [telephoneno, setTelephone] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const DineCustomerRegForm = {cusid, resid, name, time, date, couplequantity, groupquantity, telephoneno}

        try {
            const response = await axios.post('/api/realtimebooking', DineCustomerRegForm);
            await axios.post('/api/customerhistoryroute', DineCustomerRegForm);
            const json = response.data;

            if (response.status === 200) {
                setcusID('');
                setresID('');
                setName('');
                setTime('');
                setDate('');
                setCouplequantity('');
                setGroupquantity('');
                setTelephone('');
                setError(null);
                console.log('New booking added', json);

        } else {
            setError(json.error);
        }
        } catch (error) {
            console.error('Error adding booking:', error);
            setError('An error occurred while adding the booking.');
        }
        
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Booking</h3>
           
            <Paper sx={{bgcolor: 'white'}}>
      <Box sx={{ marginLeft: '60px', marginRight: '60px', marginTop: '40px', marginBottom:'40px', padding: '20px' }}>
              <h2>Payment Details</h2>
              <Grid container spacing={4}>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="CusID"
                    type="text"
                    onChange={(e) => setcusID(e.target.value)}
                    value={cusid}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="ResID"
                    type="text"
                    onChange={(e) => setresID(e.target.value)}
                    value={resid}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Time"
                    type="time"
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Date"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="CoupleQuantity"
                    type="number"
                    onChange={(e) => setCouplequantity(e.target.value)}
                    value={couplequantity}
                    sx={{ width: '100%' }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Groupquantity"
                    type="number"
                    onChange={(e) => setGroupquantity(e.target.value)}
                    value={groupquantity}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Telephone No"
                    type="text"
                    onChange={(e) => setTelephone(e.target.value)}
                    value={telephoneno}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            </Box>
      </Paper>

            <button>Add Booking</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default DineCustomerRegForm;