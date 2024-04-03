import { Grid, Stack,InputAdornment, TextField,MenuItem,Select,InputLabel,FormControl,Button, Paper } from '@mui/material';
import React, { useState,useEffect } from 'react';
import { updateEmpPayrunData,getPayrunData } from '../services/api';
import { Box, color, containerClasses, padding } from '@mui/system';


function EmpPayrun() {
    const [payrunData, setPayrunData] = useState([]);

    useEffect(() => {
        // Fetch employee payrun data when component mounts
        const fetchEmpPayrun = async () => {
            try {
                const payrunData = await getPayrunData();
            } catch (error) {
                console.error('Error fetching employee payrun data:', error);
            }
        }
    })

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <h1>Employee Payrun Page</h1>
            <div>
                <Paper sx={{padding:'32px',bgcolor: '#F0F8FF', margin: '20px'}} >
                    <Grid container spacing={3}>
                        <Grid item md ={4}>
                            bonus
                            <Box bgcolor='#fff' p={2}>
                                item 1
                            </Box>
                        </Grid>
                        <Grid item md ={4}>
                            time period
                            <Box bgcolor='#fff' p={2}>
                                item 2
                            </Box>
                        </Grid>
                        <Grid item md ={4}>
                            <br/>
                            <Button  variant='contained'>Submit</Button>
                        </Grid>
                        <Grid item md ={4}>
                            tax
                            <Box bgcolor='#fff' p={2}>
                                item 1
                            </Box>
                        </Grid>
                        <Grid item md ={4}>
                            <br/>
                            <Box bgcolor='#fff' p={2}>
                                item 2
                            </Box>
                        </Grid>
                        <Grid item md ={4}>
                            <br/>
                            <Button  variant='contained'>Submit</Button>
                        </Grid>
                        <Grid item md ={4}>
                            ETF/EPF
                            <Box bgcolor='#fff' p={2}>
                                item 1
                            </Box>
                        </Grid>
                        <Grid item md ={4}>
                            <br/>
                            <Box bgcolor='#fff' p={2}>
                                item 2
                            </Box>
                        </Grid>
                        <Grid item md ={4}>
                            <br/>
                            <Button  variant='contained'>Submit</Button>
                        </Grid>
                    </Grid>
                    
                </Paper>
            </div>
        </div>
    );
}

export default EmpPayrun