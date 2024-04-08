import { Grid, Stack,InputAdornment, TextField,MenuItem,Select,InputLabel,FormControl,Button, Paper } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { updateEmpPayrunData,getPayrunData,paySalary } from '../services/api';
import { Box, color, containerClasses, padding } from '@mui/system';
import Payrunbtn from '../component/Payrunbtn';


function EmpPayrun() {
    const [payrunData, setPayrunData] = useState([]);

    useEffect(() => {
        // Fetch employee payrun data when component mounts
        const fetchEmpPayrun = async () => {
            try {
                const pData = await getPayrunData();
                setPayrunData(pData);
                console.log(pData);
            } catch (error) {
                console.error('Error fetching employee payrun data:', error);
            }
        }
        fetchEmpPayrun();

    },[])

    const handlesubmit = async () => {
        try {
            await paySalary(); // Call the backend function to pay the salary
            console.log('Salary paid successfully.');
            // You can also update the state or display a message indicating successful payment
        } catch (error) {
            console.error('Error paying salary:', error);
            // Handle error
        }
    };

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <h1>Employee Payrun Page</h1>
            <div>
                <Paper sx={{padding:'32px',bgcolor: '#F0F8FF', margin: '20px'}} >
                
                    <Grid container spacing={3} >
                        {payrunData.map((item) => (
                            <Grid item md ={4} padding={3} key={item._id} >
                                <Grid container>
                                    <Grid item ={6}>
                                        {item.category}
                                        <Box bgcolor='#fff' p={2} >
                                            {item.rate}    
                                        </Box>
                                    </Grid>
                                    <Grid item ={6} spacing={2}>
                                        <br/>
                                        <Payrunbtn id={item._id}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}         
                    </Grid>
                    <h3>last update:</h3>
                    <h3>Days to the next salary day:</h3>
                </Paper>
                <Button variant='contained' color='primary' onClick={handlesubmit}>
                    pay salary
                </Button>
            </div>
        </div>
    );
}

export default EmpPayrun